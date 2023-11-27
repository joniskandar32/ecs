import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";
import { StatusBar } from "@ionic-native/status-bar";
import "rxjs/add/operator/map";
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  key: string = "usernamee";
  username: any;
  username2: any;
  data: any;
  data2: any;
  dataa: any;

  data3: any;
  data4: any;
  dataa2: any;

  constructor(
    public navCtrl: NavController,
    private statusBar: StatusBar,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: Storage,
    private http: Http,
    public loading: LoadingController
  ) {
    this.storage.get(this.key).then((val) => {
      //alert(val);
      this.data2 = val;
      console.log(val);
    });
  }

  ngOnInit() {
    this.storage.get(this.key).then((val) => {
      //alert(val);
      this.data2 = val;
      console.log(val);
      //this.username = this.navParams.get('username');
      this.username = this.data2;
      var headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });
      let data = {
        username: this.username,
      };
      let loader = this.loading.create({
        content: "Processing please wait...",
      });
      loader.present().then(() => {
        this.http
          .post("https://ntc.co.id/steel/home.php", data, options)
          .map((res) => res.json())
          .subscribe((res) => {
            loader.dismiss();
            this.dataa = res.server_response;
            console.log(this.dataa);
          });
      });
    });
  }
}
