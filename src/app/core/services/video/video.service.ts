import { Injectable } from '@angular/core';
import { Video } from '../../../models/video';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { ToastrConfig } from '../../../models/toatsr.config';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { map } from "rxjs/operators";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
  ) { }

  listByCategory(category: string) {
    const data =  this.afDb.collection<Video>('videos', ref => ref.where('category', '==', category));
    return data.snapshotChanges().pipe(
      map(actions => actions.map(
        a => {
          const data = a.payload.doc.data() as Video;
          const id = a.payload.doc.id;
          return { id, ...data };
        }
      ))
    );
  }

  getVideoById(id: string) {
    return this.afDb.collection<Video>('videos').doc(id).valueChanges();
  }

  getVideosByUserId(id: string) {
    const data =  this.afDb.collection<Video>('videos', ref => ref.where('uploaderId', '==', id));
    return data.snapshotChanges().pipe(
      map(actions => actions.map(
        a => {
          const data = a.payload.doc.data() as Video;
          const id = a.payload.doc.id;
          return { id, ...data };
        }
      ))
    );
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

  isMy(uploaderId: string) {
    let currentUserId = this.authService.getUserId();
    
    if (uploaderId === currentUserId) {
      return true;
    }

    return false;
  }

  delete(id: string) {
    return this.afDb.collection('videos').doc(id).delete()
    .then((data) => {
      this.toastr.success("Successfully Delete Video!", "Success", ToastrConfig);
      this.router.navigate([ '/' ]);
    })
    .catch((err) => {
      this.toastr.error(err, "Error", ToastrConfig);
    });
  }

  editVideo(video: any) {
    let id = video.id;
    return this.afDb.collection('videos').doc(id).update(video)
      .then(() => {
        this.toastr.success("Successfully edit video!", "Success", ToastrConfig);
        this.router.navigate([ `/video/watch/${id}` ]);
      })
      .catch(err => {
        this.toastr.error(err, "Error", ToastrConfig);
      });;
  }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }
}
