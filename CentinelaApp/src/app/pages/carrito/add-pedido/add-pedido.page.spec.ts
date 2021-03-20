import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPedidoPage } from './add-pedido.page';

describe('AddPedidoPage', () => {
  let component: AddPedidoPage;
  let fixture: ComponentFixture<AddPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
