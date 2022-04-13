import mongoose from 'mongoose';
import { fail, success } from 'lib/mongoose/response';
import createHandler from 'lib/mongoose/createHandler';

const handler = createHandler();
const { User, Coupon, CouponType } = mongoose.models;

handler.get(async (req, res) => {
  const coupon = await Coupon.find({});
  success(res, coupon);
});

handler.post(async (req, res) => {
  const {
    body: { couponTypeId, userId, isUsed, expiryDate }
  } = req;
  const doesIdExist = await CouponType.exists({ _id: couponTypeId });
  if (doesIdExist) {
    const coupon = await new Coupon({
      couponTypeId,
      userId,
      isUsed,
      expiryDate
    }).save();
    const { _id } = coupon;
    await User.findByIdAndUpdate(userId, { $push: { coupons: _id } });
    success(res, coupon);
  } else {
    fail(res, '쿠폰종류ID가 유효하지 않습니다.');
  }
});

export default handler;
