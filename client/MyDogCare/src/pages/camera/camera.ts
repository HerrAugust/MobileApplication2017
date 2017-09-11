import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController,ToastController} from 'ionic-angular';

//Providers
import {CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import {DogProvider} from '../../providers/dog.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

// Needed to select next event
import { ViewChild } from "@angular/core";
import { Content } from 'ionic-angular';
import { Events } from 'ionic-angular'; // needed for pop from CameraPage
import {Diagnostic} from '@ionic-native/diagnostic';

@IonicPage()
@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html'
})
export class CameraPage { 

    public base64Image: string;

    public picture : any;

    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        toBack: true,
    };

    // picture options
    pictureOpts: CameraPreviewPictureOptions = {
        width: 150,
        height: 150,
        quality: 85
    }
    
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public sDictionary: DictionaryService,
        public diagnostic: Diagnostic,
        public popevt: Events,
        public cameraPreview: CameraPreview,
    ) {
        console.log("Home()");
       // this.checkPermissions();
       this.initializePreview();
       this.cameraPreview.setPreviewSize(this.pictureOpts);
      }

    ionViewDidLoad() {
        // Default
    }

    checkPermissions() {
        this.diagnostic.isCameraAuthorized().then((authorized) => {
            if(authorized)
                this.initializePreview();
            else {
                this.diagnostic.requestCameraAuthorization().then((status) => {
                    if(status == this.diagnostic.permissionStatus.GRANTED)
                        this.initializePreview();
                    else {
                        // Permissions not granted
                        // Therefore, create and present toast
                        this.toastCtrl.create(
                            {
                                message: "Cannot access camera", 
                                position: "bottom",
                                duration: 5000
                            }
                        ).present();
                    }
                });
            }
        });
    }

    // Called when you have given authorization to camera.
    // It will start the camera plugin to let you take photos.
    initializePreview() {
        // start camera
        this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
        (res) => {
            console.log(res)
        },
        (err) => {
            console.log(err)
        });
    }
    
    // Called when the user clicks the fab to take a picture
    takePicture() {
        console.log("Camera.takePicture()");   
        // take a picture
        this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
            this.picture = 'data:image/png;base64,' + imageData;
            console.log(this.picture);
            this.cameraPreview.stopCamera();
            this.popevt.publish('camera:taken', this.picture);
            this.navCtrl.pop();
        }, (err) => {
            console.log(err);
        });
    }

}
