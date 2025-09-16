import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe } from 'lucide-react';

const SettingsContainer = styled.div`
  padding: 0;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #00ffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 16px;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsNav = styled.div`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(20px);
  height: fit-content;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: ${props => props.active ? 'rgba(0, 255, 255, 0.1)' : 'transparent'};
  border: none;
  border-radius: 8px;
  color: ${props => props.active ? '#00ffff' : '#cccccc'};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
  
  &:hover {
    background: rgba(0, 255, 255, 0.05);
    color: #00ffff;
  }
`;

const SettingsContent = styled.div`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(20px);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  
  &::placeholder {
    color: #888;
  }
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.1);
  }
  
  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

const Switch = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchSlider = styled.div`
  width: 48px;
  height: 24px;
  background: ${props => props.checked ? '#00ffff' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  position: relative;
  transition: all 0.2s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #00ffff, #0080ff);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 255, 0.3);
  }
`;

const ButtonSecondary = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  margin-left: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const settingsSections = [
  { id: 'profile', label: '个人资料', icon: User },
  { id: 'notifications', label: '通知设置', icon: Bell },
  { id: 'security', label: '安全设置', icon: Shield },
  { id: 'appearance', label: '外观设置', icon: Palette },
  { id: 'language', label: '语言设置', icon: Globe }
];

function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <>
            <SectionTitle>
              <User size={20} />
              个人资料
            </SectionTitle>
            <FormGroup>
              <Label>用户名</Label>
              <Input type="text" placeholder="请输入用户名" defaultValue="张三" />
            </FormGroup>
            <FormGroup>
              <Label>邮箱</Label>
              <Input type="email" placeholder="请输入邮箱" defaultValue="zhangsan@company.com" />
            </FormGroup>
            <FormGroup>
              <Label>部门</Label>
              <Select defaultValue="技术部">
                <option value="技术部">技术部</option>
                <option value="产品部">产品部</option>
                <option value="运营部">运营部</option>
                <option value="人事部">人事部</option>
                <option value="财务部">财务部</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>职位</Label>
              <Input type="text" placeholder="请输入职位" defaultValue="高级开发工程师" />
            </FormGroup>
          </>
        );
      
      case 'notifications':
        return (
          <>
            <SectionTitle>
              <Bell size={20} />
              通知设置
            </SectionTitle>
            <FormGroup>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                />
                <SwitchSlider checked={notifications.email} />
                <span>邮件通知</span>
              </Switch>
            </FormGroup>
            <FormGroup>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                />
                <SwitchSlider checked={notifications.push} />
                <span>推送通知</span>
              </Switch>
            </FormGroup>
            <FormGroup>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                />
                <SwitchSlider checked={notifications.sms} />
                <span>短信通知</span>
              </Switch>
            </FormGroup>
          </>
        );
      
      case 'security':
        return (
          <>
            <SectionTitle>
              <Shield size={20} />
              安全设置
            </SectionTitle>
            <FormGroup>
              <Label>当前密码</Label>
              <Input type="password" placeholder="请输入当前密码" />
            </FormGroup>
            <FormGroup>
              <Label>新密码</Label>
              <Input type="password" placeholder="请输入新密码" />
            </FormGroup>
            <FormGroup>
              <Label>确认新密码</Label>
              <Input type="password" placeholder="请再次输入新密码" />
            </FormGroup>
            <FormGroup>
              <Switch>
                <SwitchInput type="checkbox" defaultChecked />
                <SwitchSlider checked={true} />
                <span>启用两步验证</span>
              </Switch>
            </FormGroup>
          </>
        );
      
      case 'appearance':
        return (
          <>
            <SectionTitle>
              <Palette size={20} />
              外观设置
            </SectionTitle>
            <FormGroup>
              <Label>主题</Label>
              <Select defaultValue="dark">
                <option value="dark">深色主题</option>
                <option value="light">浅色主题</option>
                <option value="auto">跟随系统</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>语言</Label>
              <Select defaultValue="zh">
                <option value="zh">简体中文</option>
                <option value="en">English</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Switch>
                <SwitchInput type="checkbox" defaultChecked />
                <SwitchSlider checked={true} />
                <span>启用动画效果</span>
              </Switch>
            </FormGroup>
          </>
        );
      
      case 'language':
        return (
          <>
            <SectionTitle>
              <Globe size={20} />
              语言设置
            </SectionTitle>
            <FormGroup>
              <Label>界面语言</Label>
              <Select defaultValue="zh">
                <option value="zh">简体中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>日期格式</Label>
              <Select defaultValue="yyyy-mm-dd">
                <option value="yyyy-mm-dd">2024-12-20</option>
                <option value="mm/dd/yyyy">12/20/2024</option>
                <option value="dd/mm/yyyy">20/12/2024</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>时间格式</Label>
              <Select defaultValue="24h">
                <option value="24h">24小时制</option>
                <option value="12h">12小时制</option>
              </Select>
            </FormGroup>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <SettingsContainer>
      <Header>
        <Title>系统设置</Title>
        <Subtitle>管理您的账户和应用程序偏好设置</Subtitle>
      </Header>

      <SettingsGrid>
        <SettingsNav>
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <NavItem
                key={section.id}
                active={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={18} />
                {section.label}
              </NavItem>
            );
          })}
        </SettingsNav>

        <SettingsContent>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
            
            <ButtonGroup>
              <Button>保存设置</Button>
              <ButtonSecondary>重置</ButtonSecondary>
            </ButtonGroup>
          </motion.div>
        </SettingsContent>
      </SettingsGrid>
    </SettingsContainer>
  );
}

export default Settings;

