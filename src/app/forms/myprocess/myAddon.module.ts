import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { startNewProcessComponent } from './startNewProcess.component';
import { ApproveDataTaskComponent } from './approveDataTask.component';


@NgModule({
  entryComponents: [startNewProcessComponent, ApproveDataTaskComponent],
  declarations: [startNewProcessComponent, ApproveDataTaskComponent],
  imports: [FormsModule],
  exports: [startNewProcessComponent, ApproveDataTaskComponent]
})
export class MyAddonModule {}

export { startNewProcessComponent } from './startNewProcess.component';
export { ApproveDataTaskComponent } from './approveDataTask.component';
