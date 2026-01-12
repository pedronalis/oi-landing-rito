'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TrialBannerProps {
    className?: string;
    showButton?: boolean;
}

export function TrialBanner({ className }: TrialBannerProps) {
    const currentMonth = useMemo(() => {
        return new Date().toLocaleString('pt-BR', { month: 'long' });
    }, []);

    // Capitalize first letter of month
    const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
                'relative overflow-hidden rounded-xl border border-brand-400/20',
                'bg-white/5 backdrop-blur-md',
                'p-6 sm:p-8 text-center shadow-[0_4px_30px_rgba(0,0,0,0.1)]',
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-400 via-brand-400 to-brand-300">
                        EXPERIMENTE POR 15 DIAS GRÁTIS!
                    </span>
                </h3>
                <p className="text-cream-300 text-sm sm:text-base font-medium">
                    Oferta especial válida em <span className="text-brand-300">{formattedMonth}</span> para o plano Iniciado
                </p>
            </div>
        </motion.div>
    );
}
