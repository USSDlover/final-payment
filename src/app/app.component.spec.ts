import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {PurchaseModel} from './shared/models';
import {SharedModule} from './shared/shared.module';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatToolbarHarness} from '@angular/material/toolbar/testing';
import {Component} from '@angular/core';

@Component({selector: 'fs-purchase', template: ``})
class MockPurchaseComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;
  const initialState = {purchases: []};
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [AppComponent],
      providers: [
        provideMockStore({initialState})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have already purchased info displayed', async () => {
    store.setState({purchases: [PurchaseModel.dummy(), PurchaseModel.dummy()]});
    fixture.detectChanges();
    const displayedPurchase = fixture.debugElement.queryAll(By.css('div'));
    expect(displayedPurchase.length).toBe(2);
  });

  it('should have button to navigate', async () => {
    const button = await loader.getHarness(MatButtonHarness.with({text: component.btnTxt}));
    expect(button).toBeTruthy();
  });

  it('should have toolbar', async () => {
    const toolbar = await loader.getHarness(MatToolbarHarness);
    expect(toolbar).toBeTruthy();
  });
});
