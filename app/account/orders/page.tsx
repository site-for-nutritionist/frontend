'use client'

import { useCatalogStore } from "@/entities/catalog"
import { ProductCard } from "@/features/cards/product-card"
import { PageHeader } from "@/features/page-header"
import { CardsGridTemplate } from "@/widgets/layouts/cards-grid"
import { useEffect } from "react"

export default function AccountOrdersPage() {

    const { data, load } = useCatalogStore(state => ({
        data: state.cards,
        load: state.loadCardsByCategory
    }))

    useEffect(() => {
        load()
    }, [load])

    return (
        <>
            <PageHeader title='Мои заказы' />

            <CardsGridTemplate
                items={data}
                CardFactory={ProductCard}
                context={{ isHideButton: true }}
            />    
        </>
    )
}