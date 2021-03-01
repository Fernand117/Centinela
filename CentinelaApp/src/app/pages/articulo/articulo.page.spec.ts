import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArticuloPage } from './articulo.page';

describe('ArticuloPage', () => {
  let component: ArticuloPage;
  let fixture: ComponentFixture<ArticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
