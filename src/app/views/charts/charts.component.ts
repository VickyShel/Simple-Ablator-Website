import {Component, Injectable, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent{
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  best_iteration=[]
  charts=[]
  labels=[]
  charts_bind=[]
  // chartLineData = {
  //   labels: [...this.months].slice(0, 10),
  //   datasets: [
  //     {
  //       backgroundColor: 'rgba(220, 220, 220, 0.2)',
  //       borderColor: 'rgba(220, 220, 220, 1)',
  //       pointBackgroundColor: 'rgba(220, 220, 220, 1)',
  //       pointBorderColor: '#fff',
  //       data: []
  //     }
  //   ]
  // };

  // ngOnInit(): void {
  //   this.pond = FilePond.create();
  //   console.log("charts component ngOnInit function")
  //
  //   this.pond.on('addfile', (file: any) => {
  //     console.log("hhhhhh")
  //     console.log('File added:', file.file);
  //   });
  //
  //   this.pond.on('processfile', (error: any, file: any) => {
  //     if (!error) {
  //       console.log('File processed:', file.file);
  //       const uploadedFile = file.file;
  //
  //       // 将上传的 zip 压缩包文件传递给后端
  //       const formData = new FormData();
  //       formData.append('zipFile', uploadedFile);
  //
  //       // 使用 Fetch API 发送表单到后端
  //       fetch('http://localhost:5500//upload', {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       // 在这里可以将文件上传到后端服务器
  //     } else {
  //       console.error('File process error:', error);
  //     }
  //   });
  // }
  // pondOptions = {
  //   server: '/api/upload'
  // };
  constructor(private httpClient: HttpClient,private cdr: ChangeDetectorRef) { }
  // constructor(private http: HttpClient) { }
  selectedFile: File | undefined;
  onFilePondFileAdded(event:any) {
    // const formData = new FormData();
    console.log("file push")
    console.log(event)
    console.log(event.target.files[0])
    this.selectedFile=event.target.files[0]
    // const formData=new FormData();
    // formData.append('zipFng build --prodile', event.target.files[0]);
    // console.log(formData)
    // console.log(formData.get('zipFile'))
    // // fetch('http://localhost:5500//upload', {
    // //   method: 'POST',
    // //   body: formData,
    // // });
    // const headers = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data',
    //   // Add any additional headers here, if needed
    // });
    // const options = { headers, withCredentials: false,};
    // this.httpClient.post('http://localhost:5500/upload',event.target.files[0],options).subscribe(
    //   response => {
    //     console.log('文件上传成功', response);
    //   },
    //   error => {
    //     console.error('文件上传失败', error);
    //   }
    // );
    // File added to FilePond, do nothing for now
  }
  uploadFile() {
    if (!this.selectedFile) {
      console.error('Please select a file before uploading.');
      return;
    }
    console.log("upload file")
    // 创建FormData对象，并将文件添加到FormData中
    const formData = new FormData();
    formData.append('zipFile', this.selectedFile);

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      // Add any additional headers here, if needed
    });
    const options = { headers, withCredentials: false};
    // 发送POST请求，将FormData传递给后端
    // @ts-ignore
    this.httpClient.post('https://simple-ablator-website-backend.uc.r.appspot.com/upload',formData).subscribe(
      (res) => {
        // @ts-ignore
        const response=res[0]
        // @ts-ignore
        const names=res[1]
        console.log('File uploaded successfully:', response);
        // @ts-ignore
        // console.log(response[0]['best_iteration'])
        this.charts=[]
        // @ts-ignore
        for(const key in response[0]){
          // @ts-ignore
          this.labels.push(key)
          const chartLineData = {
            labels:[1,2,3,4,5,6,7,8,9,10],
            datasets: [
              {
                label:names[0],
                backgroundColor: 'rgba(220, 220, 220, 0.2)',
                borderColor: 'rgba(220, 220, 220, 1)',
                pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                pointBorderColor: '#fff',
                data: []
              }
            ]
          }
          // @ts-ignore
          chartLineData.datasets[0].data = response[0][key]
          // @ts-ignore
          // this.chartLineData=[...this.chartLineData]
          // console.log(this.chartLineData.datasets[0].data)
          // @ts-ignore
          this.charts.push(chartLineData)
        }
        // @ts-ignore
        console.log(response.length)
        // @ts-ignore
        for(let i = 1; i < response.length; i++){
          // @ts-ignore
          var j=0
          // @ts-ignore
          for(const key in response[i]){
            const new_data = {
              label:names[i],
              backgroundColor: 'rgba(220, 220, 220, 0.2)',
              borderColor: 'rgba(220, 220, 220, 1)',
              pointBackgroundColor: 'rgba(220, 220, 220, 1)',
              pointBorderColor: '#fff',
              data: []
            }
            // @ts-ignore
            new_data.data=response[i][key]
            // @ts-ignore
            this.charts[j].datasets.push(new_data)
            j=j+1
          }
        }
        console.log(this.charts)
        this.charts_bind=this.charts
      },
      (error) => {
        console.error('File upload failed:', error);
      }
    );
  }
}
