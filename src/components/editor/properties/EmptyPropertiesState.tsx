import React from "react";
import { Settings } from "lucide-react";
import { EmptyState } from "../../ui/EmptyState";
import { t } from "@/lib/i18n";

export const EmptyPropertiesState: React.FC = () => {
  return (
    <div className="w-full md:w-92 min-h-0 panel-shell flex flex-col p-4 overflow-y-auto scrollbar-thin shrink-0 select-none">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium">{t("properties.title")}</span>
      </div>
      <EmptyState icon={Settings} title={t("properties.selectClip")} />
    </div>
  );
};
