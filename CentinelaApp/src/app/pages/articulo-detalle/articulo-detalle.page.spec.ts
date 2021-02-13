import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArticuloDetallePage } from './articulo-detalle.page';

describe('ArticuloDetallePage', () => {
  let component: ArticuloDetallePage;
  let fixture: ComponentFixture<ArticuloDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticuloDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
