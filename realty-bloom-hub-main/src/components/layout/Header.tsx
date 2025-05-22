
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Home, Search, Heart, Bell, LogIn, Plus, MapPin, Building, Star, BookmarkCheck, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary animate-fade-in" />
            <span className="hidden font-bold text-xl md:inline-block animate-fade-in">RealtyChance</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        to="/properties"
                      >
                        <Building className="h-6 w-6 text-white" />
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          Properties
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Browse our extensive collection of properties across India
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/properties?type=buy" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Buy</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Find properties available for purchase
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/properties?type=rent" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Rent</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Explore rentals across cities
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/new-projects" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">New Projects</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Latest residential and commercial developments
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <div className="mb-2 text-sm font-semibold text-muted-foreground">Trending Locations</div>
                    <div className="flex flex-col space-y-3 p-2">
                      {["Gurgaon", "Noida", "Bangalore", "Hyderabad", "Mumbai", "Pune"].map(city => (
                        <NavigationMenuLink asChild key={city}>
                          <Link
                            to={`/search?city=${city}`}
                            className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-3 w-3 text-secondary" />
                              <div className="text-sm font-medium leading-none">{city}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 text-sm font-semibold text-muted-foreground">Popular Cities</div>
                    <div className="flex flex-col space-y-3 p-2">
                      {["Delhi NCR", "Chennai", "Kolkata", "Ahmedabad", "Lucknow", "Jaipur"].map(city => (
                        <NavigationMenuLink asChild key={city}>
                          <Link
                            to={`/search?city=${city}`}
                            className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-3 w-3" />
                              <div className="text-sm font-medium leading-none">{city}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/search" className={cn(navigationMenuTriggerStyle())}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/new-projects" className={cn(navigationMenuTriggerStyle())}>
                <Star className="mr-2 h-4 w-4" />
                New Projects
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/favorites" className="relative p-2 rounded-full hover:bg-primary/10 transition-colors">
                <Heart className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full"></span>
              </Link>
              <Link to="/notifications" className="relative p-2 rounded-full hover:bg-primary/10 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full"></span>
              </Link>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <User className="mr-2 h-4 w-4" />
                      {user?.name || 'Account'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Dashboard</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Manage your account
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        
                        {user?.role === 'property_owner' && (
                          <li>
                            <NavigationMenuLink asChild>
                              <Link to="/my-properties" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">My Properties</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Manage your listings
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )}
                        
                        {user?.role === 'admin' && (
                          <li>
                            <NavigationMenuLink asChild>
                              <Link to="/admin" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">Admin Panel</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Manage the platform
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )}
                        
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/favorites" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Favorites</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Your saved properties
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        
                        <li className="border-t pt-2 mt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none text-destructive">Logout</div>
                          </button>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              {(user?.role === 'admin' || user?.role === 'property_owner') && (
                <Button asChild>
                  <Link to="/post-property">
                    <Plus className="mr-2 h-4 w-4" />
                    Post Property
                  </Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <div className="space-y-2">
              <div className="font-medium">Properties</div>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link 
                    to="/properties" 
                    className="flex items-center text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/properties?type=buy" 
                    className="flex items-center text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Buy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/properties?type=rent" 
                    className="flex items-center text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Rent
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/new-projects" 
                    className="flex items-center text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    New Projects
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Popular Locations</div>
              <ul className="pl-4 space-y-2">
                {["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"].map(city => (
                  <li key={city}>
                    <Link 
                      to={`/search?city=${city}`} 
                      className="flex items-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <Link 
                to="/search" 
                className="flex items-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </div>
            
            {isAuthenticated ? (
              <>
                <div className="space-y-2">
                  <div className="font-medium">My Account</div>
                  <ul className="pl-4 space-y-2">
                    <li>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/favorites" 
                        className="flex items-center text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </Link>
                    </li>
                    {(user?.role === 'admin' || user?.role === 'property_owner') && (
                      <li>
                        <Link 
                          to="/post-property" 
                          className="flex items-center text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Post Property
                        </Link>
                      </li>
                    )}
                    // In the NavigationMenuContent for user account, update the admin section:
                    {user?.role === 'admin' && (
                      <>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/admin" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Admin Dashboard</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Manage the entire platform
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/admin/properties" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Property Management</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Manage all properties
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link 
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
