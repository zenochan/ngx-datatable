import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapPaginatorComponent } from './bootstrap-paginator.component';

describe('BootstrapPaginatorComponent', () => {
  let component: BootstrapPaginatorComponent;
  let fixture: ComponentFixture<BootstrapPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
