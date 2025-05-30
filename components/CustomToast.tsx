"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useApexAdmin from "@/utils/ApexAdmin";
import ScreenSize from "@/hooks/ScreenSize";
import { useTranslations } from "next-intl";

export default function CustomToast() {
  const { toast, setToast } = useApexAdmin();

  const dimension = ScreenSize();

  const t = useTranslations("toast");

  useEffect(() => {
    if (toast.isVisible) {
      setTimeout(() => setToast(false, "", ""), 3000);
    }
  }, [toast]);

  return (
    <AnimatePresence>
      {toast.isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: dimension[0] > 500 ? 0 : 10, opacity: 1 }}
          exit={{ x: 500, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className={`md500:w-[400px] w-[300px] min-h-[60px] fixed top-4 right-10 z-[100] flex flex-col items-start gap-3 p-5
          bg-opacity-80 bg-black/50 backdrop-blur-md shadow-lg border-l-[5px]`}
          style={{ borderColor: toast.type === "success" ? "green" : "red" }}
        >
          <p className="md500:text-[16px] text-[14px] text-white">
            {toast.text}
          </p>

          <button
            className="px-4 h-[35px] bg-black text-white self-end shadow-md hover:opacity-50 duration-300"
            onClick={() => setToast(false, "", "")}
          >
            <p className="text-[14px]">{t("off")}</p>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
