var A4Width=595.28;
var A4Height=848;
var AddresOverlayHeight= 127;
var TEXTBOX_HEIGHT=50;
var STD_FRAME_MARGIN = 9;//a little less than 4mm
var PDF_SIZE_FACTOR = 2.834;

var base64PDF;

//resources
var imgFrame, imgFramePortrait, imgFrameLandscape;
var imgPattern;
var imgTextBox;
var imgFade;
var imgAddressOverlay;

var frameThickness =1.0;

var pattern;

//iteration
var index=0;//keep track of the number of photos added
var myImage;
var FrontCover =0;
var BackCover =0;

// gets a calculated percentage depending on the amount of pages that are drawn already
var generatedPagesprogress = 0;
var generatedPagesprogressCallback = false;

var template;
var currentPage;
var currentPhoto;
var photosInCurrentPage=0;
var pageCounter=0;

var doc;
var stream;

var kLandscape =0;
var kPortrait =1;
var generatedMagazinesBlobUrl = {};

var resolve;
var reject;

// public method for encoding an Uint8Array to base64
function encode (input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input[i++];
    chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
    chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
}

function addImage(image_name, x, y, imgWidth, imgHeight)
{
  var  infoBlock= document.getElementById("information");
  if (infoBlock) {
    infoBlock.innerHTML ="<font face=Arial size=15 color=333333> Photo: "+ (index +1);
  }

  // standard: 300
  var imageSize = 600;
  if (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0) {
    // standard:  100
    imageSize = 200;
  }

  var oReq = new XMLHttpRequest();
  var cloudUrl = 'https://cloud.onsfotoboek.nl/image.php';
  oReq.open("GET", cloudUrl + '?width=' + imageSize + '&height=' + imageSize + '&image=' + image_name + "&t=" + Math.random(), true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(oEvent)
  {
    var data = oReq.response; //image as an arraybuffer
    var mimetype = oReq.getResponseHeader('Content-Type');

    var frameMargin = STD_FRAME_MARGIN *frameThickness;
    var frameDecoration =0;

    if(currentPhoto) imgFrame  = currentPhoto.orientation == kLandscape ? imgFrameLandscape : imgFramePortrait;
    myImage = new Uint8Array(data);

    if(index == FrontCover)
    {
      doc.image(myImage, x- STD_FRAME_MARGIN, y, {height: imgHeight});//automatic height
      buildTitlePage();//continue building the title page
    }
    else if( index == BackCover)
    {
      doc.image(myImage, x, y, {width: imgWidth});//automatic height
      doc.image(imgAddressOverlay, 0,A4Height-15-AddresOverlayHeight , {width: A4Width, height: AddresOverlayHeight});
    }
    else if(imgFrame && x>-1 && y> -1 && imgWidth+x< 600)
    {

      frameDecoration = template.frameDecorationThickness * imgWidth/100;
      var inFrameWidth = imgWidth - frameMargin*2;
      var inFrameHeight = imgHeight - frameMargin*2;
      doc.image(imgFrame, x, y, {width: imgWidth, height: imgHeight});
      doc.image(myImage, x+frameMargin +frameDecoration, y+frameMargin+frameDecoration, {width: inFrameWidth-(frameDecoration*2), height: inFrameHeight-(frameDecoration*2)});
    }
    else
    {
      if (currentPhoto.isSpread == 1) {
        doc.image(myImage, (-5* PDF_SIZE_FACTOR), y, {
          height : (323 * PDF_SIZE_FACTOR)
        });
      } else if (currentPhoto.isSpread == 2) {
        //spread rechts
        doc.image(myImage, (x -(205 * PDF_SIZE_FACTOR)), y, {
          height : (323 * PDF_SIZE_FACTOR)
        });
      } else

      {
        //Geen spread
        doc.image(myImage, x, y, {
          width : imgWidth
        });
      }
    }

    if(currentPhoto)
    {
      if(currentPhoto.text && currentPhoto.isSpread ==0)
      {

        var textBoxWidth = imgWidth -(frameDecoration*2);
        var textBoxY = (imgHeight+ y)- TEXTBOX_HEIGHT -frameDecoration;
        var textBoxX =x + frameDecoration;

        if(imgFrame) {
          textBoxWidth-= (frameMargin*2)
          textBoxX += frameMargin;
          textBoxY -= frameMargin;
        }

        doc.image(imgTextBox, textBoxX, textBoxY, {width: textBoxWidth, height: TEXTBOX_HEIGHT+1});
        doc.fillColor('white');
        doc.fontSize(12);
        doc.text(currentPhoto.text,textBoxX,textBoxY+15,{  width: textBoxWidth, height:TEXTBOX_HEIGHT-15 , align: 'center'});
      }
    }

    /*setTimeout(nextStep, 200);*/
    nextStep();
  }

  oReq.send(null);
}

function buildTitlePage()
{
  var  infoBlock= document.getElementById("information");
  if (infoBlock) {
    infoBlock.innerHTML ="<font face=Arial size=15 color=333333> Title";
  }

  var coverTitlePositionY = 600;

  switch(template.frontCover.titlePosition) {
    case 0:
      coverTitlePositionY = 120;
      break;
    case 1:
      coverTitlePositionY = 360;
      break;
    case 2:
      coverTitlePositionY = 600;
      break;
    default:
      coverTitlePositionY = 600;
  }

  if(template.frontCover.title.length > 0 || template.frontCover.subtitle.length >0)
  {
    doc.image(imgFade,0 , coverTitlePositionY-100, {width: A4Width, height: 300});
  }
  doc.fontSize(45);
  doc.font('Helvetica');
  doc.fillColor('black');

  doc.text(template.frontCover.title,0,coverTitlePositionY,{width: A4Width, align: 'center'});
  doc.fontSize(30);
  doc.text(template.frontCover.subtitle, 0, coverTitlePositionY + 50,{  width: A4Width, align: 'center'});
}

function startGeneratingPDF()
{
  doc = new PDFDocument();
  stream = doc.pipe(blobStream());

  doc.addPage({size: "a4"});
  var  infoBlock= document.getElementById("information");
  if (infoBlock) {
    infoBlock.innerHTML ="<font face=Arial size=15 color=333333> Processing";
  }

  frameThickness = template.frameThickness;
  addImage(template.frontCover.filePath, 0, 0, A4Width,A4Height);
}

//because of the async behavior for loading the images
function nextStep(cb)
{
  if(index < template.numberOfPhotos)
  {
    if( currentPage==null || currentPage === undefined || photosInCurrentPage >=currentPage.length)
    {
      //Add a new page with the right background and pattern
      //TODO: add the right pattern
      currentPage = template.pages[pageCounter++];

      photosInCurrentPage = 0;
      doc.addPage({size: "a4"});
      doc.rect(0, 0, A4Width, A4Height).fill(template.pageColor);

      if(template.pattern >0)
      {
        doc.image(imgPattern, 0, 0, {width: A4Width});
      }
    }

    currentPhoto = currentPage[photosInCurrentPage];
    photosInCurrentPage++;

    addImage(currentPhoto.filePath, currentPhoto.x*PDF_SIZE_FACTOR, currentPhoto.y*PDF_SIZE_FACTOR, currentPhoto.width*PDF_SIZE_FACTOR, currentPhoto.height*PDF_SIZE_FACTOR);
    index++;

    // update progress
    generatedPagesprogress = (100 / template.numberOfPhotos * index);
    if (generatedPagesprogressCallback) {
      generatedPagesprogressCallback(generatedPagesprogress);
    }

  }else {

    var  infoBlock= document.getElementById("information");
    if (infoBlock) {
      infoBlock.innerHTML = "";
    }

    doc.end();
    stream.on('finish', function() {
      var blobURL = stream.toBlobURL('application/pdf');
      var blobObject = stream.toBlob('application/pdf');

      resolve({ 'url': blobURL, 'object': blobObject });

      //clear all variables
      doc.flushPages();
      doc =null;
      myImage=null;
      index = 0;

      delete myImage;

      FrontCover = 0;
      BackCover = 0;

      template = null;
      currentPage = null;
      currentPhoto = null;

      photosInCurrentPage = 0;
      pageCounter = 0;

      stream = null;

      enableGeneratorActions();
    });
  }
}

/////Entrypoint////
function createMagazineWithJSON(jsonString, _resolve, _reject, uploadprogressCallback){
  var oReq = new XMLHttpRequest();
  template = JSON.parse(jsonString);
  BackCover = template.numberOfPhotos;
  console.log("Done loading template");

  generatedPagesprogressCallback = uploadprogressCallback;

  resolve = _resolve;
  reject = _reject;

  //this contains the call to startGeneratingPDF due to the asynchronous calls to get the resources
  loadResources();
}

function getBase64PDF()
{
  return base64PDF;
}

function loadResources()
{
  loadTextBox();
  if(template.frame >0)  {
    loadFrame();
  } else {
    imgFramePortrait = undefined;
    imgFrameLandscape = undefined;
  }
  if(template.pattern >0) loadPattern();
  loadAddressOverlay();
  loadTitleFade();
}

//###################################################################
//Loading resources part
//TODO: make this nicer :(
function loadTitleFade()
{

  var request = new XMLHttpRequest();
  request.open("GET", "assets/app_rsc/white_blur.rsc", true);
  request.responseType = "arraybuffer";

  request.onload = function(oEvent)
  {
    var data= request.response; //image as an arraybuffer
    imgFade = new Uint8Array(data);
    startGeneratingPDF();
  }

  request.send(null);
}

function loadTextBox()
{
  var request = new XMLHttpRequest();
  request.open("GET", "assets/app_rsc/text_background.rsc", true);
  request.responseType = "arraybuffer";

  request.onload = function(oEvent)
  {
    var data = request.response; //image as an arraybuffer
    imgTextBox = new Uint8Array(data);

  }
  request.send(null);
}

function loadAddressOverlay()
{

  var request = new XMLHttpRequest();
  request.open("GET", "assets/app_rsc/address_overlay.rsc", true);
  request.responseType = "arraybuffer";

  request.onload = function(oEvent)
  {
    var data = request.response; //image as an arraybuffer
    imgAddressOverlay = new Uint8Array(data);

  }
  request.send(null);
}

function loadFrame()
{
  var requestPortrait = new XMLHttpRequest();
  requestPortrait.open("GET", "assets/images/frames/frame_"+template.frame+"_portrait.rsc", true);
  requestPortrait.responseType = "arraybuffer";

  requestPortrait.onload = function(oEvent)
  {
    var data = requestPortrait.response; //image as an arraybuffer
    imgFramePortrait = new Uint8Array(data);
  }
  requestPortrait.send(null);

  var requestLandscape = new XMLHttpRequest();
  requestLandscape.open("GET", "assets/images/frames/frame_"+template.frame+"_landscape.rsc", true);
  requestLandscape.responseType = "arraybuffer";

  requestLandscape.onload = function(oEvent)
  {
    var data = requestLandscape.response; //image as an arraybuffer
    imgFrameLandscape = new Uint8Array(data);
  }
  requestLandscape.send(null);
}

function loadPattern()
{

  var request = new XMLHttpRequest();
  request.open("GET", "assets/images/patterns/pattern_"+template.pattern+".rsc", true);
  request.responseType = "arraybuffer";

  request.onload = function(oEvent)
  {
    var data = request.response; //image as an arraybuffer
    imgPattern = new Uint8Array(data);
  }

  request.send(null);
}

function enableGeneratorActions() {
  // Enable functionality after loading
  $('[ui-view], .navbar').removeClass('s-disabled--flipbook');
  $('.loader-spinner').removeClass('s-visible');
}

