import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #00ffff;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00ffff, #0080ff);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: glow 2s ease-in-out infinite alternate;
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: rgba(15, 15, 15, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #00ffff;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Nav = styled.nav`
  flex: 1;
  padding: 24px 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  color: ${props => props.active ? '#00ffff' : '#cccccc'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #00ffff;
    background: rgba(0, 255, 255, 0.05);
  }
  
  ${props => props.active && `
    background: rgba(0, 255, 255, 0.1);
    border-right: 3px solid #00ffff;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #00ffff, #0080ff);
    }
  `}
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarFooter = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
  color: #888;
  font-size: 12px;
  text-align: center;
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: '仪表板' },
  { path: '/projects', icon: FolderOpen, label: '项目管理' },
  { path: '/tasks', icon: CheckSquare, label: '任务管理' },
  { path: '/analytics', icon: BarChart3, label: '数据分析' },
  { path: '/settings', icon: Settings, label: '设置' },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MobileToggle onClick={toggleSidebar}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </MobileToggle>
      
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      
      <SidebarContainer
        isOpen={isOpen}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarHeader>
          <Logo>
            <LogoIcon>
              <LayoutDashboard size={18} />
            </LogoIcon>
            TaskFlow
          </Logo>
        </SidebarHeader>
        
        <Nav>
          <NavList>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavItem key={item.path}>
                  <NavLink 
                    to={item.path} 
                    active={isActive}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconWrapper>
                      <Icon size={18} />
                    </IconWrapper>
                    {item.label}
                  </NavLink>
                </NavItem>
              );
            })}
          </NavList>
        </Nav>
        
        <SidebarFooter>
          © 2024 TaskFlow Pro
        </SidebarFooter>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;

