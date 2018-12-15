import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MailService } from "src/app/services/service.index";

declare function init_plugins();

@Component({
  selector: "app-forget",
  templateUrl: "./forget.component.html",
  styleUrls: ["../login.component.css"]
})
export class ForgetComponent implements OnInit {
  forma: FormGroup;

  constructor(public mailService: MailService) {}

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      correo: new FormControl("", [Validators.email, Validators.email])
    });
  }

  enviarCorreo() {
    console.log("correo", this.forma.value.correo);

    let to: string = this.forma.value.correo;

    this.mailService
      .sendMailForgetPassword(this.forma.value.correo)
      .subscribe((resp: any) => resp);
  }
}
