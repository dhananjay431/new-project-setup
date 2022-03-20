import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: any = 'new-project-setup';

  ngOnInit(): void {
    this.login();
  }
  login() {
    let that = this;
    $.cordys.authentication.sso
      .authenticate('administrator2', 'administrator2')
      .done((resp: any) => {
        console.log('Done');
        that.test_WS();
      });
  }
  test_WS() {
    let that = this;
    $.cordys.ajax({
      method: 'GetPA_UserScreenAccess',
      namespace: 'http://schemas.cordys.com/PA_WsAppPackage',
      dataType: '* json',
      parameters: {
        Pod_id: '',
      },
      success: function success(resp: any) {
        let test = $.cordys.json.find(resp, 'ScreenAccess');
        that.title = test;
        console.log(test);
      },
      error: function error(e1: any, e2: any, e3: any) {
        console.log('err=>', e1, e2, e3);
      },
    });
  }
}
