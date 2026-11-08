"use client";

import { createContext, useContext } from "react";
import { QUALITY_SETTINGS, type QualitySettings } from "@/lib/day/quality";

// React context doesn't cross the R3F reconciler boundary, so DayScene provides this
// again *inside* <Canvas>.
const QualityContext = createContext<QualitySettings>(QUALITY_SETTINGS.full);

export const QualityProvider = QualityContext.Provider;
export const useQualitySettings = () => useContext(QualityContext);
