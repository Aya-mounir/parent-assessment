import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesLayoutComponent } from './pages-layout.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('PagesLayoutComponent', () => {
  let component: PagesLayoutComponent;
  let fixture: ComponentFixture<PagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesLayoutComponent,NavBarComponent],
      imports: [RouterTestingModule], // Import RouterTestingModule here

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesLayoutComponent);
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
      { title: 'enquire', active: false },
    ];

    expect(component.navItems).toEqual(expectedNavItems);
  });

  // Add more tests as needed for PagesLayoutComponent functionality
});

