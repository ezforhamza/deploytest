// src/components/ui/Icon.jsx

import React from "react";
import {
  School,
  MapPin,
  Briefcase,
  UserPlus,
  MessageCircle,
  X,
} from "lucide-react";

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  ...props
}) => {
  const iconMap = {
    school: School,
    location: MapPin,
    briefcase: Briefcase,
    userAdd: UserPlus,
    message: MessageCircle,
    close: X,
  };

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent size={size} color={color} className={className} {...props} />
  );
};

export default Icon;
