import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { FilesService , AppStateService, CommonService } from '../../../shared/services';

@Component({
  selector: 'app-step-1-photos',
  templateUrl: './step-1-photos.component.html',
  styleUrls: ['./step-1-photos.component.scss']
})
export class Step1PhotosComponent implements OnInit {
  errors: Array<string> =[];
  dragAreaClass: string = 'dragarea';
  fileExt: string[] = ["JPG", "JPEG"];
  minPortraitFiles: number = 2;
  minFiles: number = 36;
  maxFiles: number = 100;
  maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();

  totalPortraitCounts: number = 0;

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
    private _notifications: NotificationsService,
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

          if (newFile.orientation === 1) {
            this.totalPortraitCounts++;
          }

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
    if (files.length > 0 && (!this.isValidFileExtension(files))) {
        this.uploadStatus.emit(false);
        return;
    }

    if (files.length > 0) {
      this.newFiles = _.values(files);
      // this.saveNewFilesFromLocal();
      this.uploadNextFile();
    }
  }

  saveNewFilesFromLocal() {
    this.errors = []; // Clear error
    this.newFiles.forEach((file, idx) => {
      const myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        const base64Data = myReader.result;

        var newFile = {
          url: base64Data,
          isNotUploaded: true,
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
        if (idx === this.newFiles.length - 1) {
          this.appStateService.files = this.files;
          this.filesService.files = this.files;      
        }
      };

      myReader.readAsDataURL(file);
    })
  }

  deleteFile(file) {
    this.filesService.deleteFile(file)
      .subscribe((data) => {
        if (file.isCover === true) {
          // deleteStepsStorage deletes the selected-cover
          // and we want to do this only if the user deletes their cover,
          // so that they are forced to go to step 2 again which shows them
          // a new cover.
          // storageService.deleteStepsStorage().then(function(state) {
            this.refreshPhotoList();
          // });
        } else {
          this.refreshPhotoList();
        }
      }, (error) => {
        console.log('Error removing photo', error);
      });     
  }

  photoUrl(file) {
    return file.isNotUploaded ? file.url : this.imageScaleUrl + '?width=300&height=300&image=' + file.url + '&t=' + this.timestamp;
  }

  isTooSmall(file) {
    if (!file) return;

    var min = 800;
    if (file.width < min || file.height < min)
      return true;

    return false;
  }

  get uploadedFilesMessage() {
    return this.commonService.translateTemplate('STEP_1_MESSAGE_UPLOADED_FILES', {n: this.files.length});
  }

  get minMaxWarningMessage() {
    const uploadedCount = this.files.length;
    const min = this.minFiles;
    const max = this.maxFiles;
    if (uploadedCount < min) {
      return this.commonService.translateTemplate('STEP_1_MESSAGE_MIN_FILES', {missingCount: min - uploadedCount});
    } else if (uploadedCount > max) {
      return this.commonService.translateTemplate('STEP_1_MESSAGE_MAX_FILES', {overCount: uploadedCount - max});
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
                this._notifications.error(`Error (Extension): ${ext}`, null, {
                  clickToClose: true,
                  timeOut: 2000
                });

                return false;
            }
            // Check file size
            // this.isValidFileSize(files[i]);
        }

        return true;
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
