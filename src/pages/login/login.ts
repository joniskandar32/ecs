import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, AlertController } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import { StatusBar } from "@ionic-native/status-bar";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  @ViewChild("username") username;
  @ViewChild("password") password;
  key: string = "usernamee";
  data: string;

  constructor(
    public navCtrl: NavController,
    private statusBar: StatusBar,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController,
    private storage: Storage
  ) {
    this.statusBar.backgroundColorByHexString("#488aff");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    this.statusBar.backgroundColorByHexString("#488aff");
  }

  signIn() {
    //// check to confirm the username and password fields are filled
    if (this.username.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATTENTION",
        subTitle: "Username field is empty",
        buttons: ["OK"],
      });
      alert.present();
    } else if (this.password.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATTENTION",
        subTitle: "Password field is empty",
        buttons: ["OK"],
      });
      alert.present();
    } else {
      this.storage.set(this.key, this.username.value);
      var headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });
      let data = {
        username: this.username.value,
        password: this.password.value,
      };
      let loader = this.loading.create({
        content: "Processing please wait…",
      });

      loader.present().then(() => {
        this.http
          .post("https://ntc.co.id/steel/login.php", data, options)
          .map((res) => res.json())
          .subscribe((res) => {
            console.log(res);
            loader.dismiss();
            if (res == "Your Login success") {
              let alert = this.alertCtrl.create({
                title: "Welcome back",
                subTitle: res,
                buttons: ["OK"],
              });
              alert.present();

              this.navCtrl.setRoot(TabsPage);
              //this.navCtrl.setRoot(TabsPage,data);
              //.setRoot = agar jadi screen tidak punya back menu di navbar
              //.push    = agar screen punya back menu di navbar
            } else if (res == "Komandan") {
              let alert = this.alertCtrl.create({
                title: "Login Berhasil",
                subTitle: res,
                buttons: ["OK"],
              });
              alert.present();

              this.navCtrl.setRoot(TabsPage);
              //this.navCtrl.setRoot(TabsPage,data);
              //.setRoot = agar jadi screen tidak punya back menu di navbar
              //.push    = agar screen punya back menu di navbar
            } else {
              let alert = this.alertCtrl.create({
                title: "Login Gagal",
                subTitle: "Your Login Username or Password is invalid",
                buttons: ["OK"],
              });
              alert.present();
            }
          });
      });
    } //end
  }
}
