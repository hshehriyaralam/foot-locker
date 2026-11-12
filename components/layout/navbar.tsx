"use client";
import { CircleUser, Handbag, Menu, Search, X, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { logo } from "@/images/Images";
import LoginModal from "../common/loginModal";

import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "@/store/modalSlice";
import { useFetchProductsQuery } from "@/store/services/productApi";
import { RootState } from "@/store/store";
import { signOutHeader } from "@/lib/helper/signOutHandler";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isOpen } = useSelector((state: any) => state.modal);
  const { totalQuantity } = useSelector((state: any) => state.cart);
  const { profile, loading: userLoading } = useSelector((state: RootState) => state.user);
  const { data: products = [], isLoading: productsLoading } = useFetchProductsQuery(undefined);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  console.log("products=>",products);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileMenu]);

  // ✅ Dynamic Categories with useMemo
  const navLinks = useMemo(() => {
    const mainCategories: Record<string, any> = {};
    const generateSlug = (name: string) =>
      name.toLowerCase().trim().replace(/\s+/g, "-");

    products.forEach((product: any) => {
      const mainSlug = product.mainCategorySlug;
      const subSlug = product.subCategorySlug;
      if (!mainSlug || !subSlug) return;

      if (!mainCategories[mainSlug]) {
        mainCategories[mainSlug] = {
          id: Object.keys(mainCategories).length + 1,
          text: product.mainCategory
            ? product.mainCategory.charAt(0).toUpperCase() + product.mainCategory.slice(1)
            : mainSlug.charAt(0).toUpperCase() + mainSlug.slice(1),
          link: `/${mainSlug}`,
          categories: {},
        };
      }

      if (!mainCategories[mainSlug].categories[subSlug]) {
        mainCategories[mainSlug].categories[subSlug] = {
          title: product.subCategory,
          link: `/${mainSlug}?sub=${subSlug}`,
          items: [],
        };
      }

      const brands = mainCategories[mainSlug].categories[subSlug].items;
      if (product.brand && !brands.some((b: any) => b.name === product.brand)) {
        brands.push({
          name: product.brand,
          link: `/${mainSlug}?sub=${subSlug}&brand=${generateSlug(product.brand)}`,
        });
      }
    });

    return Object.values(mainCategories).map((category: any) => ({
      ...category,
      categories: Object.values(category.categories),
    }));
  }, [products]);

  const isUser = !!profile;

  const logOutHandler = async () => {
    setUserDropdown(false);
    await signOutHeader(dispatch, router);
  };

  return (
    <nav className="w-full border-b font-maven sticky top-0 bg-white z-40">
      <div className="flex items-center justify-between lg:px-8 px-4 py-4">

        {/* LEFT: Mobile Menu + Logo */}
        <div className="flex items-center lg:gap-4 gap-2">
          <Button
            onClick={() => setMobileMenu(true)}
            className="lg:hidden bg-transparent p-0"
          >
            <Menu className="text-black w-7 h-7" />
          </Button>
          <Link className="hidden lg:block" href="/" prefetch={false}>
            <Image src={logo} alt="logo" width={150} height={150} className="object-contain" />
          </Link>
        </div>

        {/* Center Logo on Mobile */}
        <Link className="lg:hidden block" href="/" prefetch={false}>
          <Image src={logo} alt="logo" width={140} height={140} className="object-contain" />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center border rounded px-4 py-2 w-[400px] lg:w-[550px]">
          <input type="text" placeholder="Search" className="w-full outline-none" />
          <Search className="w-5 h-5 text-gray-500" />
        </div>

        {/* Right Side: User + Cart */}
        <div className="flex items-center lg:gap-6 gap-3">

          {/* ✅ User Section - Loading / Logged In / Guest */}
          {userLoading ? (
            <div className="flex items-center gap-2 px-4 py-1">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
              <div className="hidden lg:block w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : isUser ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-2 lg:px-4 transition-colors"
              >
                <CircleUser className="w-6 h-6" />
                <span className="hidden lg:block text-sm font-medium truncate max-w-[100px]">
                  Hi, {profile?.first_name || "User"}
                </span>
                <ChevronDown className={`w-4 h-4 hidden lg:block transition-transform ${userDropdown ? "rotate-180" : ""}`} />
              </div>

              {/* Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border shadow-lg z-50">
                  <div className="p-4 border-b">
                    <p className="text-sm font-bold text-black truncate">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
                  </div>

                  <Link
                    href="/order"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Handbag className="w-4 h-4" /> My Orders
                  </Link>

                  <button
                    onClick={logOutHandler}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => dispatch(toggleModal())}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-2 lg:px-4 transition-colors"
            >
              <CircleUser className="w-6 h-6" />
              <p className="hidden lg:block text-sm font-medium">Sign In | Join FLX</p>
            </div>
          )}

          {/* Cart */}
          <Link href="/cart" prefetch={false} className="relative cursor-pointer">
            <Handbag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {totalQuantity ?? 0}
            </span>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center justify-center gap-10 mb-2 relative">
        {productsLoading ? (
          // ✅ Skeleton loader (better than "Loading...")
          <div className="flex gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          navLinks.map((link: any) => (
            <div key={link.id} className="group">
              <Link
                href={link.link}
                prefetch={false}
                className="font-semibold text-[#0E1111] text-md relative py-2"
              >
                {link.text}
                <div className="h-[2px] bg-[#0E1111] scale-x-0 group-hover:scale-x-100 transition duration-300 origin-left" />
              </Link>

              {link.categories?.length > 0 && (
                <div className="absolute left-0 top-full w-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10 p-10">
                    {link.categories.map((category: any, index: number) => (
                      <div key={index}>
                        <Link
                          href={category.link}
                          prefetch={false}
                          className="font-bold mb-4 block hover:underline"
                        >
                          {category.title}
                        </Link>
                        <div className="flex flex-col gap-3">
                          {category.items.map((item: any, i: number) => (
                            <Link
                              key={i}
                              href={item.link}
                              prefetch={false}
                              className="text-gray-600 hover:text-black"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[300px] bg-white z-[999] overflow-y-auto transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-xl">Menu</h2>
          <Button className="bg-transparent p-0" onClick={() => setMobileMenu(false)}>
            <X className="text-black w-6 h-6" />
          </Button>
        </div>

        {/* Mobile User Info */}
        {isUser && !userLoading && (
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm font-bold">{profile?.first_name} {profile?.last_name}</p>
            <p className="text-xs text-gray-500 mb-3 truncate">{profile?.email}</p>
            <div className="flex gap-2">
              <Link href="/order" onClick={() => setMobileMenu(false)} className="flex-1">
                <Button className="w-full rounded-none bg-black text-white text-xs h-9">
                  My Orders
                </Button>
              </Link>
              <Button
                onClick={() => { setMobileMenu(false); logOutHandler(); }}
                variant="outline"
                className="flex-1 rounded-none border-black text-xs h-9"
              >
                Logout
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Nav */}
        <div className="flex flex-col p-4 gap-6">
          {productsLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            navLinks.map((link: any) => (
              <div key={link.id}>
                <Link
                  href={link.link}
                  prefetch={false}
                  onClick={() => setMobileMenu(false)}
                  className="font-semibold text-lg"
                >
                  {link.text}
                </Link>
                <div className="ml-3 mt-3 flex flex-col gap-3">
                  {link.categories?.map((category: any, i: number) => (
                    <div key={i}>
                      <Link
                        href={category.link}
                        prefetch={false}
                        onClick={() => setMobileMenu(false)}
                        className="font-medium block"
                      >
                        {category.title}
                      </Link>
                      <div className="ml-3 mt-2 flex flex-col gap-2">
                        {category.items.map((item: any, idx: number) => (
                          <Link
                            key={idx}
                            href={item.link}
                            prefetch={false}
                            onClick={() => setMobileMenu(false)}
                            className="text-sm text-gray-500 hover:text-black py-1"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-[998] lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Login Modal */}
      {isOpen && <LoginModal />}
    </nav>
  );
};

export default React.memo(Navbar);