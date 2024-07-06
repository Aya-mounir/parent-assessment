import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [Title],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title to "Spaces"', () => {
    spyOn(titleService, 'setTitle');

    fixture.detectChanges();

    expect(titleService.setTitle).toHaveBeenCalledWith('Spaces');
  });

  it('should have a dynamicTitle property initialized with "Spaces"', () => {
    expect(component.dynamicTitle).toEqual('Spaces');
  });

  // Add more tests as needed for AppComponent functionality
});

