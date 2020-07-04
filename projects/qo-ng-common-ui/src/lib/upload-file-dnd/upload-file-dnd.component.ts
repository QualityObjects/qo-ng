import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Optional,
  Self,
  OnDestroy,
  HostBinding
} from "@angular/core";
import { Subject } from 'rxjs';
import { ControlValueAccessor, FormControlName } from "@angular/forms";
import { Subscription } from "rxjs";
import { MatFormFieldControl } from "@angular/material/form-field";

export class FileField {
  file: any;
  name: string;
  size?: number;
  constructor(fields?: FileField) {
    Object.assign(this, fields);
  }
}

@Component({
  selector: "upload-file-dnd",
  templateUrl: "./upload-file-dnd.component.html",
  styleUrls: ["./upload-file-dnd.component.scss"],
  providers: [{provide: MatFormFieldControl, useExisting: UploadFileComponent}],
})
export class UploadFileComponent implements OnInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<FileField[]> {
  public value: FileField[] = undefined;
  get empty(): boolean {
    return !this.value || !this.value.length;
  }

  @Input()
  required: boolean = false;

  get showError(): boolean {
    return !!this.errorMsg;
  }
  @ViewChild("fileDropRef", { static: true }) private selectFile: ElementRef;

  @Input()
  public placeholder: string = "Arrastra y suelta aquí los ficheros";

  @Input("errorMsg")
  public errorMsg: string;

  private onChange: (delta: FileField[]) => void = _ => {};

  @Input()
  public disabled: boolean = false;

  /**
   * Si true se aceptan múltiples ficheros simúltáneos
   */
  @Input()
  public multiFile: boolean = false;

  /**
   * Texto de ayuda para mostrarlo debajo del componente, por ejemplo con extensiones aceptadas o tamaños máximos
   */
  @Input()
  public hint: string;

  /**
   * Variable para mostrar el loading muestra sea true
   */
  @Input()
  public loading: boolean = false;

  /**
   * Lista de estensiones separada por comas o en formato array:
   * "txt,docx,doc,xls" 
   * ["txt","docx","doc","xls"]
   */
  @Input('allowedExtensions')
  public set allowedExtensions(exts: string | string[]) {
    
    if (typeof exts === 'string') {
      this._extensions = new Set(exts.split(',').map(e => e.toLowerCase().trim()));
    } else {
      this._extensions = new Set([...<string[]>exts].map(e => e.toLowerCase().trim()));
    }
  }
  private _extensions: Set<string>;

  private errorTimer: any;

  /**
   * Tamaño máximo permitido de cada fichero
   */
  @Input()
  public maxSize: number;

  public get allowMoreFiles() : boolean {
    return !this.disabled && (this.empty || this.multiFile);
  }

  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    if (!obj) {
      this.clear();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(@Optional() @Self() public ngControl: FormControlName) {
    if (this.ngControl != null) {
      /* Esto evita el provider estatico: NG_VALUE_ACCESSOR */
      this.ngControl.valueAccessor = this;
    }
  }

  private sub: Subscription;
  ngOnInit() {
    this.sub = this.ngControl.control.parent.statusChanges.subscribe((status) => {
        if (status === 'INVALID' && this.ngControl.invalid && !!this.ngControl.formDirective) {
            if (this.ngControl.formDirective.submitted === true) {
//                this.ngControl.control.markAsTouched({onlySelf: true});
//                this.hasFormError = true;
            }
        }
    });
}

  ngOnDestroy() {
    !!this.sub && this.sub.unsubscribe(); 
  }

  updateFilesList(files: any[]) {

    if (!this.value) {
      this.value = [];
    }
    this.errorMsg = '';
    let errores : string[] = [];
    if (!this.allowMoreFiles) {
      errores.push(`No se pueden subir más ficheros`);
    } else if (!this.multiFile && files.length > 1) {
      errores.push(`Sólo se puede subir un fichero`);
    } else {
      for (let f of files) {      
        if (this.maxSize && this.maxSize < f.size) {
          errores.push(`Fichero "${f.name}" excede tamaño máximo`);
          continue;
        }
        if (!!this._extensions) {
          let ext = f.name.substring(f.name.lastIndexOf('.') + 1).toLowerCase();
          if (!this._extensions.has(ext)) {
            errores.push(`El formato del fichero "${f.name}" no está soportado`);
            continue;
          }
        }
        this.value.push(new FileField({
          name: f.name,
          size: f.size,
          file: f
        }));
      }
    }
    if (errores.length) {
      this.errorMsg = errores.join(', ');
      clearTimeout(this.errorTimer);
      this.errorTimer = setTimeout(() => this.errorMsg = '', 4000);
    }
    this.setValue(this.value)
    this.selectFile.nativeElement.value = "";
  }

  clear() {
    this.setValue(undefined);
    this.selectFile.nativeElement.value = "";
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.value.splice(index, 1);
    this.setValue(this.value);
  }

  private setValue(val: FileField[]) {
    this.value = val;
    this.onChange(this.value);
    this.onTouched();
    this.stateChanges.next();
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // MAtFormfieldControl
  stateChanges: Subject<void> = new Subject<void>();
  static nextId = 1;

  @HostBinding() id = `upload-file-dnd-${UploadFileComponent.nextId++}`;

  focused: boolean = false;
  shouldLabelFloat: boolean = false;
  get errorState(): boolean {
    return (this.ngControl?.invalid && this.ngControl?.formDirective?.submitted === true);
  }
  controlType: string = "upload-file-dnd";
  autofilled: boolean = false;

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
    // Do nothing
  }
}
