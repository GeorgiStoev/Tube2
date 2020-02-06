import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router
  ) { }

  createVideo(name: string, category: string, videoUrl: string, uploaderId: string, date: Date) {
    this.afDb.collection<Video>('videos').add({
      name: name,
      category: category,
      videoUrl: videoUrl,
      uploaderId: uploaderId,
      date: date 
    })
    .then((data) => {
      this.router.navigate([ '/' ])
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
