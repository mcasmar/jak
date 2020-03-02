import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { LoginComponent } from 'src/app/feature/login/login.component';
import { RegisterComponent } from 'src/app/feature/register/register.component';
import { ModalDirective } from 'src/app/core/directives/modal.directive';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild(ModalDirective, { static: true }) modalHost: ModalDirective;

  isOpen: boolean;
  hideModal = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {}

  close() {
    this.isOpen = false;
  }

  loadComponent(type: string): void {
    const component: any =
      type === 'login' ? LoginComponent : RegisterComponent;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );

    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();

    viewContainerRef.createComponent(componentFactory);

    this.isOpen = true;
  }

  ngOnInit() {
    this.modalService.openedModal.subscribe(type => {
    this.hideModal = false;
      if (!type) {
        this.close();
        return;
      }
      this.loadComponent(type);
    });
  }
}
