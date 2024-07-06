import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set active item based on router URL', () => {
    component.navItems = [
      { title: 'Home', active: false },
      { title: 'About', active: false },
      { title: 'Contact', active: false },
    ];

    // Simulate router navigation to 'About' page
    router.navigate(['/about']).then(() => {
      fixture.detectChanges();

      // Expect 'About' to be active
      expect(component.navItems[1].active).toBe(true);

      // Expect others to be inactive
      expect(component.navItems[0].active).toBe(false);
      expect(component.navItems[2].active).toBe(false);
    });
  });

  it('should change status of nav items correctly', () => {
    component.navItems = [
      { title: 'Home', active: false },
      { title: 'About', active: false },
      { title: 'Contact', active: false },
    ];

    // Change status to 'Home'
    component.changeStatus('Home');
    fixture.detectChanges();

    expect(component.navItems[0].active).toBe(true);
    expect(component.navItems[1].active).toBe(false);
    expect(component.navItems[2].active).toBe(false);

    // Change status to 'Contact'
    component.changeStatus('Contact');
    fixture.detectChanges();

    expect(component.navItems[0].active).toBe(false);
    expect(component.navItems[1].active).toBe(false);
    expect(component.navItems[2].active).toBe(true);
  });
});
