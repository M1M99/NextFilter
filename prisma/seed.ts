import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt'

async function main(){

    const password=await bcrypt.hash('user123',10);

    const user1=await prisma.user.create({
        data:{
            email:'user1@gmail.com',
            password
        }
    });

    const user2=await prisma.user.create({
        data:{
            email:'user2@gmail.com',
            password
        }
    });


    await prisma.property.createMany({
        data:[
            {
                title:'Modern Villa',
                description:'Lux villa wth sea view',
                price:500000,
                location:'Baku',
                imageUrl:'https://villa.az/uploads/products/1717494883A44301/web/active/10-1717508263.jpg',
                ownerId:user1.id
            },
            {
                title:'City Apartment',
                description:'Cozy 2-room apartment in city center',
                price:120000,
                location:'Ganja',
                imageUrl:'https://d3w13n53foase7.cloudfront.net/medium_2177d8f3_48c2_4f41_b249_e17b19db0019_0110_ganja_bottle_house_gyandzha_butylochnyi_dom_f1c0e0c24a.JPG',
                ownerId:user1.id
            },
            {
                title:'Cheap Villa',
                description:'Small villa in region',
                price:125000,
                location:'Masazir',
                imageUrl:'https://arenda.az/uploads/emlak/thumbs/big_gallery/c2/36/c236a44a1f4f7215a090383191c2e093.jpg',
                ownerId:user2.id
            },
            {
                title:'Royal villa',
                description:'Great villa with 10 rooms',
                price:850000,
                location:'Baku',
                imageUrl:'https://azbina.az/wp-content/uploads/2024/02/Merdekan-villa-shuvelan-Bravo-markete-yaxin.jpg?v=1707225218',
                ownerId:user2.id
            }
        ]
    });
}

main();