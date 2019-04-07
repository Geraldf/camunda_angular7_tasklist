import { CamundaRestService } from "../../camunda-rest.service";
import { ActivatedRoute } from "@angular/router";
import { OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export class StartProcessInstanceComponent {
  model: { [x: string]: any };
  submitted: boolean;
  error: boolean;
  route: ActivatedRoute;
  camundaRestService: CamundaRestService;
  errMsg: any;

  constructor(route: ActivatedRoute, camundaRestService: CamundaRestService) {
    this.route = route;
    this.camundaRestService = camundaRestService;
  }
  onSubmit() {
    this.route.params.subscribe(params => {
      const processDefinitionKey = params["processdefinitionkey"];
      const variables = this.generateVariablesFromFormFields();
      this.camundaRestService
        .postProcessInstance(processDefinitionKey, variables)
        .subscribe(
          result => {
            this.submitted = true;
            this.error = false;
          },
          err => {
            this.errMsg = err;
            this.error = true;
          }
        );
      //this.submitted = true;
    });
  }

  generateVariablesFromFormFields() {
    const variables = {
      variables: {}
    };
    Object.keys(this.model).forEach(field => {
      variables.variables[field] = {
        value: this.model[field]
      };
    });

    return variables;
  }
}
