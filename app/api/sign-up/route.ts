import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import { connectToDB } from '../../../utils/database';
import { use } from 'react';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, password, email } = body.data;

  if (!name || !email || !password) {
    return new NextResponse('Missing name, email, or password', {
      status: 400,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await connectToDB();

  const exist = await User.findOne({ email: email });

  if (exist) {
    return new NextResponse('User already exists', { status: 400 });
  }

  const user = await User.create({
    email: email,
    name: name,
    hashedPassword: hashedPassword,
  });

  return NextResponse.json(user);
}
