import { Injectable } from '@angular/core';
import { Video } from '../../../models/video';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { ToastrConfig } from '../../../models/toatsr.config';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) { }

  listNews() {
    return this.afDb.collection('videos', ref => ref.where('category', '==', 'News')).snapshotChanges();
  }

  listMusic() {
    return this.afDb.collection('videos', ref => ref.where('category', '==', 'Music')).snapshotChanges();
  }

  listSport() {
    return this.afDb.collection('videos', ref => ref.where('category', '==', 'Sport')).snapshotChanges();
  }

  getVideoById(id) {
    return this.afDb.collection('videos').doc(id).valueChanges();
  }

  createVideo(name: string, category: string, videoUrl: string, uploaderId: string, date: Date) {
    
    this.afDb.collection<Video>('videos').add({
      name: name,
      category: category,
      videoUrl: videoUrl,
      uploaderId: uploaderId,
      date: date 
    })
    .then((data) => {
      this.toastr.success("Successfully Upload Video!", "Success", ToastrConfig);
      this.router.navigate([ '/' ]);
    })
    .catch((err) => {
      this.toastr.error(err, "Error", ToastrConfig);
    });
  }
}
