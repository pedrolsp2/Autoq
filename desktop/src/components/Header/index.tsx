import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { useGetLocation } from '@/hooks/useGetLocation';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const location = useGetLocation(pathname);

  return (
    <header className="flex items-center h-16 gap-2 shrink-0">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4 mr-2" />
        <Breadcrumb>
          <BreadcrumbList>
            {location?.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                {index + 1 === location.length ? (
                  <BreadcrumbPage className="hidden md:block">
                    <BreadcrumbLink>{item}</BreadcrumbLink>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink>{item}</BreadcrumbLink>
                  </BreadcrumbItem>
                )}

                {index > 0 ||
                  (index + 1 !== location.length && (
                    <span className="ml-1 font-semibold">&gt;</span>
                  ))}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
