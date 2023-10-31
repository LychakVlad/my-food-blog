import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import { connectToDB } from '../../../utils/database';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password, email } = body.data;

  if (!username || !email || !password) {
    return new NextResponse('Missing name, email, or password', {
      status: 400,
    });
  }

  await connectToDB();

  const exist = await User.findOne({ email: email });

  if (exist) {
    return new NextResponse('User already exists', { status: 400 });
  }

  const hashedPassword = await bcrypt.hashSync(password, 10);

  const user = await User.create({
    email: email,
    username: username,
    password: hashedPassword,
  });

  return NextResponse.json(user);
}
