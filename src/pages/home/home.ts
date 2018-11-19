import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { Media } from '@ionic-native/media';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nativepath: string;
  file;
  filechooer() {
      FileChooser.open()
          .then(uri => {
              ( < any > window).FilePath.resolveNativePath(uri, (result) => {
                  this.nativepath = result;
                  this.audioplay()
              }, (err) => {
                  alert(err);
              })
          })
          .catch(e => console.log(e));
  }
  //file:///C:\Users\LARAH\Desktop\musicas
  audioplay() {
      var pathalone = this.nativepath.substring(8);
      this.file = new Media(pathalone, (status) => {

      });
      this.file.play();
  }

  tracks: any;
  currentTrack: any;
  progressInterval: any;

  constructor() {

      this.tracks = [{
          title: 'Something About You',
          artist: 'ODESZA',
          playing: false,
          progress: 0
      }];

      this.currentTrack = this.tracks[0];

  }
  //BOTÕES
  playTrack(track) {

      for (let checkTrack of this.tracks) {

          if (checkTrack.playing) {
              this.pauseTrack(checkTrack);
          }

      }

      track.playing = true;
      this.currentTrack = track;

      this.progressInterval = setInterval(() => {

          track.progress < 100 ? track.progress++ : track.progress = 0;

      }, 1000);

  }


  pauseTrack(track) {

      track.playing = false;
      clearInterval(this.progressInterval);
  }
  nextTrack() {

      let index = this.tracks.indexOf(this.currentTrack);
      index >= this.tracks.length - 1 ? index = 0 : index++;

      this.playTrack(this.tracks[index]);
  }

  prevTrack() {

      let index = this.tracks.indexOf(this.currentTrack);
      index > 0 ? index-- : index = this.tracks.length - 1;

      this.playTrack(this.tracks[index]);

  }

}