import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  const ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    await prisma.ticketType.createMany({
      data: [
        {
          name: 'Online',
          price: 100,
          isRemote: true,
          includesHotel: false,
        },
        {
          name: 'Presencial',
          price: 250,
          isRemote: false,
          includesHotel: false,
        },
        {
          name: 'Presencial',
          price: 600,
          isRemote: false,
          includesHotel: true,
        },
      ],
    });
  }
  
  const hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    await prisma.hotel.createMany({
      data: [
        {
          name: 'Victoria Hotel',
          image: 'https://lirp.cdn-website.com/7f7b6d4f/dms3rep/multi/opt/fachada+%281%29+%281%29-640w.jpg',
        },
        {
          name: 'Malibu Hotel',
          image: 'https://www.ahstatic.com/photos/1276_ho_00_p_1024x768.jpg',
        },
        {
          name: 'Caribben Hotel',
          image:
            'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/620d6d91270c8.jpg/1920x1080/fit/80/eb7551cd93224863612f7472c55d933f.jpg',
        },
      ],
    });
  }
  const VictoriaHotel = await prisma.hotel.findFirst({
    where: {
      name: 'Victoria Hotel',
    },
  });
  const MalibuHotel = await prisma.hotel.findFirst({
    where: {
      name: 'Malibu Hotel',
    },
  });
  const CaribbenHotel = await prisma.hotel.findFirst({
    where: {
      name: 'Caribben Hotel',
    },
  });
  const room = await prisma.room.findFirst();

  if (VictoriaHotel && MalibuHotel && CaribbenHotel && !room) {
    await prisma.room.createMany({
      data: [
        {
          name: '1',
          capacity: 1,
          hotelId: VictoriaHotel.id,
        },
        {
          name: '2',
          capacity: 1,
          hotelId: VictoriaHotel.id,
        },
        {
          name: '3',
          capacity: 2,
          hotelId: VictoriaHotel.id,
        },
        {
          name: '4',
          capacity: 2,
          hotelId: VictoriaHotel.id,
        },
        {
          name: '5',
          capacity: 2,
          hotelId: VictoriaHotel.id,
        },
        {
          name: '6',
          capacity: 2,
          hotelId: VictoriaHotel.id,
        },
      ],
    });

    await prisma.room.createMany({
      data: [
        {
          name: '1',
          capacity: 2,
          hotelId: MalibuHotel.id,
        },
        {
          name: '2',
          capacity: 3,
          hotelId: MalibuHotel.id,
        },
        {
          name: '3',
          capacity: 1,
          hotelId: MalibuHotel.id,
        },
        {
          name: '4',
          capacity: 2,
          hotelId: MalibuHotel.id,
        },
        {
          name: '5',
          capacity: 3,
          hotelId: MalibuHotel.id,
        },
        {
          name: '6',
          capacity: 2,
          hotelId: MalibuHotel.id,
        },
      ],
    });

    await prisma.room.createMany({
      data: [
        {
          name: '1',
          capacity: 1,
          hotelId: CaribbenHotel.id,
        },
        {
          name: '2',
          capacity: 2,
          hotelId: CaribbenHotel.id,
        },
        {
          name: '3',
          capacity: 1,
          hotelId: CaribbenHotel.id,
        },
        {
          name: '4',
          capacity: 2,
          hotelId: CaribbenHotel.id,
        },
        {
          name: '5',
          capacity: 1,
          hotelId: CaribbenHotel.id,
        },
        {
          name: '6',
          capacity: 3,
          hotelId: CaribbenHotel.id,
        },
      ],
    });
  }

  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
