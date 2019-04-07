import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CamundaRestService } from "../../camunda-rest.service";
import { StartProcessInstanceComponent } from "../general/start-process-instance.component";
import { MyProcessData } from "../../schemas/MyProcessData";

@Component({
  selector: "startNewProcess",
  templateUrl: "./startNewProcess.component.html",
  styleUrls: []
})
export class startNewProcessComponent extends StartProcessInstanceComponent {
  submitted: boolean = false;
  error: boolean = false;
  model = new MyProcessData("", "", "", false);
  errMsg: any;

  constructor(
    route: ActivatedRoute,
    camundaRestService: CamundaRestService,
    router: Router
  ) {
    super(route, camundaRestService, router);
  }
}
