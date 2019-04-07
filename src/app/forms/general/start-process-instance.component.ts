import { CamundaRestService } from "../../camunda-rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { OnInit, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { routerNgProbeToken } from "@angular/router/src/router_module";

export class StartProcessInstanceComponent implements OnDestroy {
  model: { [x: string]: any };
  submitted: boolean;
  error: boolean;
  route: ActivatedRoute;
  camundaRestService: CamundaRestService;
  errMsg: any;
  private paramsSubscription: Subscription;
  private restSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    camundaRestService: CamundaRestService,
    private router: Router
  ) {
    this.route = route;
    this.camundaRestService = camundaRestService;
  }
  onSubmit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const processDefinitionKey = params["processdefinitionkey"];
      const variables = this.generateVariablesFromFormFields();
      this.restSubscription = this.camundaRestService
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

  ngOnDestroy() {
    this.restSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.router.navigate(["/home"]);
  }
}
