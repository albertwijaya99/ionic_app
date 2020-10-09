export interface Product {
    id: string;
    model: string;
    brand: string;
    imageUrl: string;
    type: string;
    price: number;
    stock: number;
}

export interface Cpu extends Product {
    base_clock: number;
    boost_clock: number;
    core_count: number;
    thread_count: number;
}

export interface Ram extends Product {
    speed: number;
    size: number;
    pcs: string;
}

export interface Motherboard extends Product {
    chipset: string;
    for_cpu_brand: string;
}

