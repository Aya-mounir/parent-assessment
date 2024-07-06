import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthLayoutComponent } from './auth-layout.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLayoutComponent,NavBarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize navItems with correct titles and initial active state', () => {
    expect(component.navItems.length).toBe(4);

    const expectedNavItems = [
      { title: 'home', active: false },
      { title: 'about', active: false },
      { title: 'contact', active: false },
      { title: 'login', active: false },
    ];

    expect(component.navItems).toEqual(expectedNavItems);
  });

  // Add more tests as needed for AuthLayoutComponent functionality
});

