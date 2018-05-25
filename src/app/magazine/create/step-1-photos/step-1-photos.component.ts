import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FilesService , AppStateService, CommonService } from '../../../shared/services';

@Component({
  selector: 'app-step-1-photos',
  templateUrl: './step-1-photos.component.html',
  styleUrls: ['./step-1-photos.component.scss']
})
export class Step1PhotosComponent implements OnInit {
  errors: Array<string> =[];
  dragAreaClass: string = 'dragarea';
  @Input() fileExt: string[] = ["JPG", "JPEG"];
  @Input() maxFiles: number = 100;
  @Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();

  files = this.appStateService.files || [];
  newFiles: any[] = [];
  imageScaleUrl = this.filesService.imageScaleUrl;
  timestamp = new Date().getMilliseconds();
  selectedImage = 0;
  amountOfPhotosToUpload = 0;
  isUploading = false;
  rotation = 0;
  
  constructor(
    private filesService: FilesService,
    private appStateService: AppStateService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    this.filesService.getFolder()
      .subscribe(
        success => {
          this.refreshPhotoList();
        },
        error => {
          console.log(error);
      })
  }

  refreshPhotoList(files = []) {
    this.filesService.getFolderPhotos()
      .subscribe((data) => {
        if (parseInt(data.errNum) == 100) {
          this.files = [];
          this.appStateService.files = this.files;
          this.filesService.files = this.files;
          return;
        }

        if (parseInt(data.errNum) != 200) {
          return;
        }

        const newFiles = [];
        data.images.forEach((image, idx) => {
          const file = image;
          const currentFile = this.filesService.getFileById(file.imgID);
          const newFile = {
            url: file.imgUrl,
            name: file.imgName,
            orientation: +file.imgWidth > +file.imgHeight ? 0 : 1,
            isCover: (file.isCover == true) ? true : false,
            id: file.imgID,
            height: +file.imgHeight,
            width: +file.imgWidth,
            text: file.text,
            weight: idx,
          };

          if (currentFile) {
            // These properties can be updated by the server, so remove these.
            delete currentFile.width;
            delete currentFile.height;
            delete currentFile.orientation;

            _.merge(newFile, currentFile);
            newFiles.push(newFile);
          } else {
            newFiles.push(newFile);
          }
        })

        // Sort by weight
        newFiles.sort((a, b) => {
          var keyA = parseInt(a.weight),
              keyB = parseInt(b.weight);

          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
        });

        newFiles.forEach((newFile, idx) => {
          newFile.weight = idx;
        })

        this.files = newFiles;
        this.appStateService.files = this.files;
        this.filesService.files = this.files;
      },(err) => {
        console.log('Error listing folder contents', err);
      })
  }

  setMainImage(selectedIndex) {
    this.selectedImage = selectedIndex;
  }

  uploadNextFile() {
    if (this.newFiles.length > 0) {
      this.isUploading = true;
      const file = this.newFiles.shift();
      this.filesService.uploadFile(file)
        .subscribe(
          success => {
            this.uploadNextFile();
          },
          error => {
            this.uploadNextFile(); // Just skip the file
        });
    } else {
      this.isUploading = false;
      this.refreshPhotoList();
    }
  }

  saveNewFiles(files){
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
        this.uploadStatus.emit(false);
        return;
    }  
  
    if (files.length > 0) {
      this.newFiles = _.values(files);
      this.uploadNextFile();
    }
  }

  saveFilesFromLocal(files){
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
        this.uploadStatus.emit(false);
        return;
    }  
  
    if (files.length > 0) {
      const filesArry = _.values(files);
      files.forEach((file) => {
        const myReader: FileReader = new FileReader();
  
        myReader.onloadend = (e) => {
          const base64Data = myReader.result;
          // this.imgSrcs.push(base64Data);

          var newFile = {
            url: base64Data,
            name: '',
            orientation: 0,
            isCover: false,
            id: '',
            height: 0,
            width: 0,
            text: '',
            weight: '',
          };

          this.files.push(newFile);
        };
    
        myReader.readAsDataURL(file);
      })        
    }
  }

  private isValidFiles(files){
    // Check Number of files
      if (files.length > this.maxFiles) {
          this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
          return;
      }
      this.isValidFileExtension(files);
      return this.errors.length === 0;
  }

  private isValidFileExtension(files){
      // Make array of file extensions
        var extensions = (this.fileExt)
                        .map(function (x) { return x.toLocaleUpperCase().trim() });

        for (var i = 0; i < files.length; i++) {
            // Get file extension
            var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            var exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push("Error (Extension): " + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
  }

  private isValidFileSize(file) {
        var fileSizeinMB = file.size / (1024 * 1000);
        var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize)
            this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
  }

  onFileChange(event){
    let files = event.target.files; 
    this.saveNewFiles(files);
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
      this.dragAreaClass = "droparea";
      event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
      this.dragAreaClass = "droparea";
      event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
      this.dragAreaClass = "dragarea";
      event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
      this.dragAreaClass = "dragarea";
      event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event) {   
      this.dragAreaClass = "dragarea";           
      event.preventDefault();
      event.stopPropagation();
      var files = event.dataTransfer.files;
      this.saveNewFiles(files);
  }
}
