/*
	MD5
	Copyright (C) 2007 MITSUNARI Shigeo at Cybozu Labs, Inc.
	license:new BSD license
	how to use
	CybozuLabs.MD5.calc(<ascii string>);
	CybozuLabs.MD5.calc(<unicode(UTF16) string>, CybozuLabs.MD5.BY_UTF16);

	ex. CybozuLabs.MD5.calc("abc") == "900150983cd24fb0d6963f7d28e17f72";
*/
var CybozuLabs = {
	MD5 : {
		// for Firefox
		int2hex8_Fx : function(x) {
			return this.int2hex8((x[1] * 65536) + x[0]);
		},

		update_Fx : function(buf, charSize) {
			var aL = this.a_[0];
			var aH = this.a_[1];
			var bL = this.b_[0];
			var bH = this.b_[1];
			var cL = this.c_[0];
			var cH = this.c_[1];
			var dL = this.d_[0];
			var dH = this.d_[1];
			var tmpL0, tmpL1, tmpL2, tmpL3, tmpL4, tmpL5, tmpL6, tmpL7, tmpL8, tmpL9, tmpLa, tmpLb, tmpLc, tmpLd, tmpLe, tmpLf;
			var tmpH0, tmpH1, tmpH2, tmpH3, tmpH4, tmpH5, tmpH6, tmpH7, tmpH8, tmpH9, tmpHa, tmpHb, tmpHc, tmpHd, tmpHe, tmpHf;
			if (charSize == 1) {
				tmpL0 = buf.charCodeAt( 0) | (buf.charCodeAt( 1) << 8); tmpH0 = buf.charCodeAt( 2) | (buf.charCodeAt( 3) << 8);
				tmpL1 = buf.charCodeAt( 4) | (buf.charCodeAt( 5) << 8); tmpH1 = buf.charCodeAt( 6) | (buf.charCodeAt( 7) << 8);
				tmpL2 = buf.charCodeAt( 8) | (buf.charCodeAt( 9) << 8); tmpH2 = buf.charCodeAt(10) | (buf.charCodeAt(11) << 8);
				tmpL3 = buf.charCodeAt(12) | (buf.charCodeAt(13) << 8); tmpH3 = buf.charCodeAt(14) | (buf.charCodeAt(15) << 8);
				tmpL4 = buf.charCodeAt(16) | (buf.charCodeAt(17) << 8); tmpH4 = buf.charCodeAt(18) | (buf.charCodeAt(19) << 8);
				tmpL5 = buf.charCodeAt(20) | (buf.charCodeAt(21) << 8); tmpH5 = buf.charCodeAt(22) | (buf.charCodeAt(23) << 8);
				tmpL6 = buf.charCodeAt(24) | (buf.charCodeAt(25) << 8); tmpH6 = buf.charCodeAt(26) | (buf.charCodeAt(27) << 8);
				tmpL7 = buf.charCodeAt(28) | (buf.charCodeAt(29) << 8); tmpH7 = buf.charCodeAt(30) | (buf.charCodeAt(31) << 8);
				tmpL8 = buf.charCodeAt(32) | (buf.charCodeAt(33) << 8); tmpH8 = buf.charCodeAt(34) | (buf.charCodeAt(35) << 8);
				tmpL9 = buf.charCodeAt(36) | (buf.charCodeAt(37) << 8); tmpH9 = buf.charCodeAt(38) | (buf.charCodeAt(39) << 8);
				tmpLa = buf.charCodeAt(40) | (buf.charCodeAt(41) << 8); tmpHa = buf.charCodeAt(42) | (buf.charCodeAt(43) << 8);
				tmpLb = buf.charCodeAt(44) | (buf.charCodeAt(45) << 8); tmpHb = buf.charCodeAt(46) | (buf.charCodeAt(47) << 8);
				tmpLc = buf.charCodeAt(48) | (buf.charCodeAt(49) << 8); tmpHc = buf.charCodeAt(50) | (buf.charCodeAt(51) << 8);
				tmpLd = buf.charCodeAt(52) | (buf.charCodeAt(53) << 8); tmpHd = buf.charCodeAt(54) | (buf.charCodeAt(55) << 8);
				tmpLe = buf.charCodeAt(56) | (buf.charCodeAt(57) << 8); tmpHe = buf.charCodeAt(58) | (buf.charCodeAt(59) << 8);
				tmpLf = buf.charCodeAt(60) | (buf.charCodeAt(61) << 8); tmpHf = buf.charCodeAt(62) | (buf.charCodeAt(63) << 8);
			} else {
				tmpL0 = buf.charCodeAt( 0); tmpH0 = buf.charCodeAt( 1);
				tmpL1 = buf.charCodeAt( 2); tmpH1 = buf.charCodeAt( 3);
				tmpL2 = buf.charCodeAt( 4); tmpH2 = buf.charCodeAt( 5);
				tmpL3 = buf.charCodeAt( 6); tmpH3 = buf.charCodeAt( 7);
				tmpL4 = buf.charCodeAt( 8); tmpH4 = buf.charCodeAt( 9);
				tmpL5 = buf.charCodeAt(10); tmpH5 = buf.charCodeAt(11);
				tmpL6 = buf.charCodeAt(12); tmpH6 = buf.charCodeAt(13);
				tmpL7 = buf.charCodeAt(14); tmpH7 = buf.charCodeAt(15);
				tmpL8 = buf.charCodeAt(16); tmpH8 = buf.charCodeAt(17);
				tmpL9 = buf.charCodeAt(18); tmpH9 = buf.charCodeAt(19);
				tmpLa = buf.charCodeAt(20); tmpHa = buf.charCodeAt(21);
				tmpLb = buf.charCodeAt(22); tmpHb = buf.charCodeAt(23);
				tmpLc = buf.charCodeAt(24); tmpHc = buf.charCodeAt(25);
				tmpLd = buf.charCodeAt(26); tmpHd = buf.charCodeAt(27);
				tmpLe = buf.charCodeAt(28); tmpHe = buf.charCodeAt(29);
				tmpLf = buf.charCodeAt(30); tmpHf = buf.charCodeAt(31);
			}

			var t;
			aL += ((bL & cL) | (~bL & dL)) + tmpL0 + 0xa478; aH += ((bH & cH) | (~bH & dH)) + tmpH0 + 0xd76a;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >>  9) | ((aL <<  7) & 65535); aH = (aL >>  9) | ((aH <<  7) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & bL) | (~aL & cL)) + tmpL1 + 0xb756; dH += ((aH & bH) | (~aH & cH)) + tmpH1 + 0xe8c7;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  4) | ((dL << 12) & 65535); dH = (dL >>  4) | ((dH << 12) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & aL) | (~dL & bL)) + tmpL2 + 0x70db; cH += ((dH & aH) | (~dH & bH)) + tmpH2 + 0x2420;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 15) | ((cH <<  1) & 65535); cH = (cH >> 15) | ((cL <<  1) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & dL) | (~cL & aL)) + tmpL3 + 0xceee; bH += ((cH & dH) | (~cH & aH)) + tmpH3 + 0xc1bd;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 10) | ((bH <<  6) & 65535); bH = (bH >> 10) | ((bL <<  6) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL & cL) | (~bL & dL)) + tmpL4 + 0x0faf; aH += ((bH & cH) | (~bH & dH)) + tmpH4 + 0xf57c;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >>  9) | ((aL <<  7) & 65535); aH = (aL >>  9) | ((aH <<  7) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & bL) | (~aL & cL)) + tmpL5 + 0xc62a; dH += ((aH & bH) | (~aH & cH)) + tmpH5 + 0x4787;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  4) | ((dL << 12) & 65535); dH = (dL >>  4) | ((dH << 12) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & aL) | (~dL & bL)) + tmpL6 + 0x4613; cH += ((dH & aH) | (~dH & bH)) + tmpH6 + 0xa830;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 15) | ((cH <<  1) & 65535); cH = (cH >> 15) | ((cL <<  1) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & dL) | (~cL & aL)) + tmpL7 + 0x9501; bH += ((cH & dH) | (~cH & aH)) + tmpH7 + 0xfd46;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 10) | ((bH <<  6) & 65535); bH = (bH >> 10) | ((bL <<  6) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL & cL) | (~bL & dL)) + tmpL8 + 0x98d8; aH += ((bH & cH) | (~bH & dH)) + tmpH8 + 0x6980;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >>  9) | ((aL <<  7) & 65535); aH = (aL >>  9) | ((aH <<  7) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & bL) | (~aL & cL)) + tmpL9 + 0xf7af; dH += ((aH & bH) | (~aH & cH)) + tmpH9 + 0x8b44;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  4) | ((dL << 12) & 65535); dH = (dL >>  4) | ((dH << 12) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & aL) | (~dL & bL)) + tmpLa + 0x5bb1; cH += ((dH & aH) | (~dH & bH)) + tmpHa + 0xffff;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 15) | ((cH <<  1) & 65535); cH = (cH >> 15) | ((cL <<  1) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & dL) | (~cL & aL)) + tmpLb + 0xd7be; bH += ((cH & dH) | (~cH & aH)) + tmpHb + 0x895c;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 10) | ((bH <<  6) & 65535); bH = (bH >> 10) | ((bL <<  6) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL & cL) | (~bL & dL)) + tmpLc + 0x1122; aH += ((bH & cH) | (~bH & dH)) + tmpHc + 0x6b90;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >>  9) | ((aL <<  7) & 65535); aH = (aL >>  9) | ((aH <<  7) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & bL) | (~aL & cL)) + tmpLd + 0x7193; dH += ((aH & bH) | (~aH & cH)) + tmpHd + 0xfd98;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  4) | ((dL << 12) & 65535); dH = (dL >>  4) | ((dH << 12) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & aL) | (~dL & bL)) + tmpLe + 0x438e; cH += ((dH & aH) | (~dH & bH)) + tmpHe + 0xa679;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 15) | ((cH <<  1) & 65535); cH = (cH >> 15) | ((cL <<  1) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & dL) | (~cL & aL)) + tmpLf + 0x0821; bH += ((cH & dH) | (~cH & aH)) + tmpHf + 0x49b4;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 10) | ((bH <<  6) & 65535); bH = (bH >> 10) | ((bL <<  6) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
///
			aL += ((bL & dL) | (cL & ~dL)) + tmpL1 + 0x2562; aH += ((bH & dH) | (cH & ~dH)) + tmpH1 + 0xf61e;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 11) | ((aL <<  5) & 65535); aH = (aL >> 11) | ((aH <<  5) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & cL) | (bL & ~cL)) + tmpL6 + 0xb340; dH += ((aH & cH) | (bH & ~cH)) + tmpH6 + 0xc040;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  7) | ((dL <<  9) & 65535); dH = (dL >>  7) | ((dH <<  9) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & bL) | (aL & ~bL)) + tmpLb + 0x5a51; cH += ((dH & bH) | (aH & ~bH)) + tmpHb + 0x265e;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  2) | ((cL << 14) & 65535); cH = (cL >>  2) | ((cH << 14) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & aL) | (dL & ~aL)) + tmpL0 + 0xc7aa; bH += ((cH & aH) | (dH & ~aH)) + tmpH0 + 0xe9b6;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 12) | ((bH <<  4) & 65535); bH = (bH >> 12) | ((bL <<  4) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL & dL) | (cL & ~dL)) + tmpL5 + 0x105d; aH += ((bH & dH) | (cH & ~dH)) + tmpH5 + 0xd62f;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 11) | ((aL <<  5) & 65535); aH = (aL >> 11) | ((aH <<  5) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & cL) | (bL & ~cL)) + tmpLa + 0x1453; dH += ((aH & cH) | (bH & ~cH)) + tmpHa + 0x0244;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  7) | ((dL <<  9) & 65535); dH = (dL >>  7) | ((dH <<  9) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & bL) | (aL & ~bL)) + tmpLf + 0xe681; cH += ((dH & bH) | (aH & ~bH)) + tmpHf + 0xd8a1;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  2) | ((cL << 14) & 65535); cH = (cL >>  2) | ((cH << 14) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & aL) | (dL & ~aL)) + tmpL4 + 0xfbc8; bH += ((cH & aH) | (dH & ~aH)) + tmpH4 + 0xe7d3;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 12) | ((bH <<  4) & 65535); bH = (bH >> 12) | ((bL <<  4) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL & dL) | (cL & ~dL)) + tmpL9 + 0xcde6; aH += ((bH & dH) | (cH & ~dH)) + tmpH9 + 0x21e1;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 11) | ((aL <<  5) & 65535); aH = (aL >> 11) | ((aH <<  5) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & cL) | (bL & ~cL)) + tmpLe + 0x07d6; dH += ((aH & cH) | (bH & ~cH)) + tmpHe + 0xc337;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  7) | ((dL <<  9) & 65535); dH = (dL >>  7) | ((dH <<  9) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & bL) | (aL & ~bL)) + tmpL3 + 0x0d87; cH += ((dH & bH) | (aH & ~bH)) + tmpH3 + 0xf4d5;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  2) | ((cL << 14) & 65535); cH = (cL >>  2) | ((cH << 14) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & aL) | (dL & ~aL)) + tmpL8 + 0x14ed; bH += ((cH & aH) | (dH & ~aH)) + tmpH8 + 0x455a;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 12) | ((bH <<  4) & 65535); bH = (bH >> 12) | ((bL <<  4) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL & dL) | (cL & ~dL)) + tmpLd + 0xe905; aH += ((bH & dH) | (cH & ~dH)) + tmpHd + 0xa9e3;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 11) | ((aL <<  5) & 65535); aH = (aL >> 11) | ((aH <<  5) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL & cL) | (bL & ~cL)) + tmpL2 + 0xa3f8; dH += ((aH & cH) | (bH & ~cH)) + tmpH2 + 0xfcef;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  7) | ((dL <<  9) & 65535); dH = (dL >>  7) | ((dH <<  9) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL & bL) | (aL & ~bL)) + tmpL7 + 0x02d9; cH += ((dH & bH) | (aH & ~bH)) + tmpH7 + 0x676f;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  2) | ((cL << 14) & 65535); cH = (cL >>  2) | ((cH << 14) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL & aL) | (dL & ~aL)) + tmpLc + 0x4c8a; bH += ((cH & aH) | (dH & ~aH)) + tmpHc + 0x8d2a;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 12) | ((bH <<  4) & 65535); bH = (bH >> 12) | ((bL <<  4) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
///
			aL += ((bL ^ cL) ^ dL) + tmpL5 + 0x3942; aH += ((bH ^ cH) ^ dH) + tmpH5 + 0xfffa;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 12) | ((aL <<  4) & 65535); aH = (aL >> 12) | ((aH <<  4) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL ^ bL) ^ cL) + tmpL8 + 0xf681; dH += ((aH ^ bH) ^ cH) + tmpH8 + 0x8771;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  5) | ((dL << 11) & 65535); dH = (dL >>  5) | ((dH << 11) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL ^ aL) ^ bL) + tmpLb + 0x6122; cH += ((dH ^ aH) ^ bH) + tmpHb + 0x6d9d;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 16) | ((cH <<  0) & 65535); cH = (cH >> 16) | ((cL <<  0) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL ^ dL) ^ aL) + tmpLe + 0x380c; bH += ((cH ^ dH) ^ aH) + tmpHe + 0xfde5;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >>  9) | ((bH <<  7) & 65535); bH = (bH >>  9) | ((bL <<  7) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL ^ cL) ^ dL) + tmpL1 + 0xea44; aH += ((bH ^ cH) ^ dH) + tmpH1 + 0xa4be;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 12) | ((aL <<  4) & 65535); aH = (aL >> 12) | ((aH <<  4) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL ^ bL) ^ cL) + tmpL4 + 0xcfa9; dH += ((aH ^ bH) ^ cH) + tmpH4 + 0x4bde;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  5) | ((dL << 11) & 65535); dH = (dL >>  5) | ((dH << 11) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL ^ aL) ^ bL) + tmpL7 + 0x4b60; cH += ((dH ^ aH) ^ bH) + tmpH7 + 0xf6bb;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 16) | ((cH <<  0) & 65535); cH = (cH >> 16) | ((cL <<  0) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL ^ dL) ^ aL) + tmpLa + 0xbc70; bH += ((cH ^ dH) ^ aH) + tmpHa + 0xbebf;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >>  9) | ((bH <<  7) & 65535); bH = (bH >>  9) | ((bL <<  7) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL ^ cL) ^ dL) + tmpLd + 0x7ec6; aH += ((bH ^ cH) ^ dH) + tmpHd + 0x289b;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 12) | ((aL <<  4) & 65535); aH = (aL >> 12) | ((aH <<  4) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL ^ bL) ^ cL) + tmpL0 + 0x27fa; dH += ((aH ^ bH) ^ cH) + tmpH0 + 0xeaa1;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  5) | ((dL << 11) & 65535); dH = (dL >>  5) | ((dH << 11) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL ^ aL) ^ bL) + tmpL3 + 0x3085; cH += ((dH ^ aH) ^ bH) + tmpH3 + 0xd4ef;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 16) | ((cH <<  0) & 65535); cH = (cH >> 16) | ((cL <<  0) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL ^ dL) ^ aL) + tmpL6 + 0x1d05; bH += ((cH ^ dH) ^ aH) + tmpH6 + 0x0488;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >>  9) | ((bH <<  7) & 65535); bH = (bH >>  9) | ((bL <<  7) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += ((bL ^ cL) ^ dL) + tmpL9 + 0xd039; aH += ((bH ^ cH) ^ dH) + tmpH9 + 0xd9d4;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 12) | ((aL <<  4) & 65535); aH = (aL >> 12) | ((aH <<  4) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += ((aL ^ bL) ^ cL) + tmpLc + 0x99e5; dH += ((aH ^ bH) ^ cH) + tmpHc + 0xe6db;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  5) | ((dL << 11) & 65535); dH = (dL >>  5) | ((dH << 11) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += ((dL ^ aL) ^ bL) + tmpLf + 0x7cf8; cH += ((dH ^ aH) ^ bH) + tmpHf + 0x1fa2;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cL >> 16) | ((cH <<  0) & 65535); cH = (cH >> 16) | ((cL <<  0) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += ((cL ^ dL) ^ aL) + tmpL2 + 0x5665; bH += ((cH ^ dH) ^ aH) + tmpH2 + 0xc4ac;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >>  9) | ((bH <<  7) & 65535); bH = (bH >>  9) | ((bL <<  7) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
///
			aL += (cL ^ ((65535 - dL) | bL)) + tmpL0 + 0x2244; aH += (cH ^ ((65535 - dH) | bH)) + tmpH0 + 0xf429;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 10) | ((aL <<  6) & 65535); aH = (aL >> 10) | ((aH <<  6) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += (bL ^ ((65535 - cL) | aL)) + tmpL7 + 0xff97; dH += (bH ^ ((65535 - cH) | aH)) + tmpH7 + 0x432a;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  6) | ((dL << 10) & 65535); dH = (dL >>  6) | ((dH << 10) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += (aL ^ ((65535 - bL) | dL)) + tmpLe + 0x23a7; cH += (aH ^ ((65535 - bH) | dH)) + tmpHe + 0xab94;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  1) | ((cL << 15) & 65535); cH = (cL >>  1) | ((cH << 15) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += (dL ^ ((65535 - aL) | cL)) + tmpL5 + 0xa039; bH += (dH ^ ((65535 - aH) | cH)) + tmpH5 + 0xfc93;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 11) | ((bH <<  5) & 65535); bH = (bH >> 11) | ((bL <<  5) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += (cL ^ ((65535 - dL) | bL)) + tmpLc + 0x59c3; aH += (cH ^ ((65535 - dH) | bH)) + tmpHc + 0x655b;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 10) | ((aL <<  6) & 65535); aH = (aL >> 10) | ((aH <<  6) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += (bL ^ ((65535 - cL) | aL)) + tmpL3 + 0xcc92; dH += (bH ^ ((65535 - cH) | aH)) + tmpH3 + 0x8f0c;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  6) | ((dL << 10) & 65535); dH = (dL >>  6) | ((dH << 10) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += (aL ^ ((65535 - bL) | dL)) + tmpLa + 0xf47d; cH += (aH ^ ((65535 - bH) | dH)) + tmpHa + 0xffef;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  1) | ((cL << 15) & 65535); cH = (cL >>  1) | ((cH << 15) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += (dL ^ ((65535 - aL) | cL)) + tmpL1 + 0x5dd1; bH += (dH ^ ((65535 - aH) | cH)) + tmpH1 + 0x8584;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 11) | ((bH <<  5) & 65535); bH = (bH >> 11) | ((bL <<  5) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += (cL ^ ((65535 - dL) | bL)) + tmpL8 + 0x7e4f; aH += (cH ^ ((65535 - dH) | bH)) + tmpH8 + 0x6fa8;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 10) | ((aL <<  6) & 65535); aH = (aL >> 10) | ((aH <<  6) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += (bL ^ ((65535 - cL) | aL)) + tmpLf + 0xe6e0; dH += (bH ^ ((65535 - cH) | aH)) + tmpHf + 0xfe2c;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  6) | ((dL << 10) & 65535); dH = (dL >>  6) | ((dH << 10) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += (aL ^ ((65535 - bL) | dL)) + tmpL6 + 0x4314; cH += (aH ^ ((65535 - bH) | dH)) + tmpH6 + 0xa301;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  1) | ((cL << 15) & 65535); cH = (cL >>  1) | ((cH << 15) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += (dL ^ ((65535 - aL) | cL)) + tmpLd + 0x11a1; bH += (dH ^ ((65535 - aH) | cH)) + tmpHd + 0x4e08;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 11) | ((bH <<  5) & 65535); bH = (bH >> 11) | ((bL <<  5) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
			aL += (cL ^ ((65535 - dL) | bL)) + tmpL4 + 0x7e82; aH += (cH ^ ((65535 - dH) | bH)) + tmpH4 + 0xf753;
			aH += aL >> 16;
			aL &= 65535; aH &= 65535;
			t = (aH >> 10) | ((aL <<  6) & 65535); aH = (aL >> 10) | ((aH <<  6) & 65535);
			aL = t + bL; aH += bH; if (aL > 65535) { aL &= 65535; aH++; }
			aH &= 65535;
			dL += (bL ^ ((65535 - cL) | aL)) + tmpLb + 0xf235; dH += (bH ^ ((65535 - cH) | aH)) + tmpHb + 0xbd3a;
			dH += dL >> 16;
			dL &= 65535; dH &= 65535;
			t = (dH >>  6) | ((dL << 10) & 65535); dH = (dL >>  6) | ((dH << 10) & 65535);
			dL = t + aL; dH += aH; if (dL > 65535) { dL &= 65535; dH++; }
			dH &= 65535;
			cL += (aL ^ ((65535 - bL) | dL)) + tmpL2 + 0xd2bb; cH += (aH ^ ((65535 - bH) | dH)) + tmpH2 + 0x2ad7;
			cH += cL >> 16;
			cL &= 65535; cH &= 65535;
			t = (cH >>  1) | ((cL << 15) & 65535); cH = (cL >>  1) | ((cH << 15) & 65535);
			cL = t + dL; cH += dH; if (cL > 65535) { cL &= 65535; cH++; }
			cH &= 65535;
			bL += (dL ^ ((65535 - aL) | cL)) + tmpL9 + 0xd391; bH += (dH ^ ((65535 - aH) | cH)) + tmpH9 + 0xeb86;
			bH += bL >> 16;
			bL &= 65535; bH &= 65535;
			t = (bL >> 11) | ((bH <<  5) & 65535); bH = (bH >> 11) | ((bL <<  5) & 65535);
			bL = t + cL; bH += cH; if (bL > 65535) { bL &= 65535; bH++; }
			bH &= 65535;
///
			t = this.a_[0] += aL; this.a_[1] += aH; if (t > 65535) { this.a_[0] -= 65536; this.a_[1]++; } this.a_[1] &= 65535;
			t = this.b_[0] += bL; this.b_[1] += bH; if (t > 65535) { this.b_[0] -= 65536; this.b_[1]++; } this.b_[1] &= 65535;
			t = this.c_[0] += cL; this.c_[1] += cH; if (t > 65535) { this.c_[0] -= 65536; this.c_[1]++; } this.c_[1] &= 65535;
			t = this.d_[0] += dL; this.d_[1] += dH; if (t > 65535) { this.d_[0] -= 65536; this.d_[1]++; } this.d_[1] &= 65535;
		},

		/* sprintf(buf, "%08x", i32); */
		int2hex8 : function(i32) {
			var i, c, ret = "";
			var hex = "0123456789abcdef";
			for (i = 0; i < 4; i++) {
				c = i32 >>> (i * 8);
				ret += hex.charAt((c >> 4) & 15);
				ret += hex.charAt(c & 15);
			}
			return ret;
		},

		update_std : function(buf, charSize) {
			var a = this.a_, b = this.b_, c = this.c_, d = this.d_;
			var tmp0, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmpa, tmpb, tmpc, tmpd, tmpe, tmpf;
			if (charSize == 1) {
				tmp0 = buf.charCodeAt( 0) | (buf.charCodeAt( 1) << 8) | (buf.charCodeAt( 2) << 16) | (buf.charCodeAt( 3) << 24);
				tmp1 = buf.charCodeAt( 4) | (buf.charCodeAt( 5) << 8) | (buf.charCodeAt( 6) << 16) | (buf.charCodeAt( 7) << 24);
				tmp2 = buf.charCodeAt( 8) | (buf.charCodeAt( 9) << 8) | (buf.charCodeAt(10) << 16) | (buf.charCodeAt(11) << 24);
				tmp3 = buf.charCodeAt(12) | (buf.charCodeAt(13) << 8) | (buf.charCodeAt(14) << 16) | (buf.charCodeAt(15) << 24);
				tmp4 = buf.charCodeAt(16) | (buf.charCodeAt(17) << 8) | (buf.charCodeAt(18) << 16) | (buf.charCodeAt(19) << 24);
				tmp5 = buf.charCodeAt(20) | (buf.charCodeAt(21) << 8) | (buf.charCodeAt(22) << 16) | (buf.charCodeAt(23) << 24);
				tmp6 = buf.charCodeAt(24) | (buf.charCodeAt(25) << 8) | (buf.charCodeAt(26) << 16) | (buf.charCodeAt(27) << 24);
				tmp7 = buf.charCodeAt(28) | (buf.charCodeAt(29) << 8) | (buf.charCodeAt(30) << 16) | (buf.charCodeAt(31) << 24);
				tmp8 = buf.charCodeAt(32) | (buf.charCodeAt(33) << 8) | (buf.charCodeAt(34) << 16) | (buf.charCodeAt(35) << 24);
				tmp9 = buf.charCodeAt(36) | (buf.charCodeAt(37) << 8) | (buf.charCodeAt(38) << 16) | (buf.charCodeAt(39) << 24);
				tmpa = buf.charCodeAt(40) | (buf.charCodeAt(41) << 8) | (buf.charCodeAt(42) << 16) | (buf.charCodeAt(43) << 24);
				tmpb = buf.charCodeAt(44) | (buf.charCodeAt(45) << 8) | (buf.charCodeAt(46) << 16) | (buf.charCodeAt(47) << 24);
				tmpc = buf.charCodeAt(48) | (buf.charCodeAt(49) << 8) | (buf.charCodeAt(50) << 16) | (buf.charCodeAt(51) << 24);
				tmpd = buf.charCodeAt(52) | (buf.charCodeAt(53) << 8) | (buf.charCodeAt(54) << 16) | (buf.charCodeAt(55) << 24);
				tmpe = buf.charCodeAt(56) | (buf.charCodeAt(57) << 8) | (buf.charCodeAt(58) << 16) | (buf.charCodeAt(59) << 24);
				tmpf = buf.charCodeAt(60) | (buf.charCodeAt(61) << 8) | (buf.charCodeAt(62) << 16) | (buf.charCodeAt(63) << 24);
			} else {
				tmp0 = buf.charCodeAt( 0) | (buf.charCodeAt( 1) << 16);
				tmp1 = buf.charCodeAt( 2) | (buf.charCodeAt( 3) << 16);
				tmp2 = buf.charCodeAt( 4) | (buf.charCodeAt( 5) << 16);
				tmp3 = buf.charCodeAt( 6) | (buf.charCodeAt( 7) << 16);
				tmp4 = buf.charCodeAt( 8) | (buf.charCodeAt( 9) << 16);
				tmp5 = buf.charCodeAt(10) | (buf.charCodeAt(11) << 16);
				tmp6 = buf.charCodeAt(12) | (buf.charCodeAt(13) << 16);
				tmp7 = buf.charCodeAt(14) | (buf.charCodeAt(15) << 16);
				tmp8 = buf.charCodeAt(16) | (buf.charCodeAt(17) << 16);
				tmp9 = buf.charCodeAt(18) | (buf.charCodeAt(19) << 16);
				tmpa = buf.charCodeAt(20) | (buf.charCodeAt(21) << 16);
				tmpb = buf.charCodeAt(22) | (buf.charCodeAt(23) << 16);
				tmpc = buf.charCodeAt(24) | (buf.charCodeAt(25) << 16);
				tmpd = buf.charCodeAt(26) | (buf.charCodeAt(27) << 16);
				tmpe = buf.charCodeAt(28) | (buf.charCodeAt(29) << 16);
				tmpf = buf.charCodeAt(30) | (buf.charCodeAt(31) << 16);
			}

			a += tmp0 + 0xd76aa478 + ((b & c) | (~b & d)); a = b + ((a <<  7) | (a >>> 25));
			d += tmp1 + 0xe8c7b756 + ((a & b) | (~a & c)); d = a + ((d << 12) | (d >>> 20));
			c += tmp2 + 0x242070db + ((d & a) | (~d & b)); c = d + ((c << 17) | (c >>> 15));
			b += tmp3 + 0xc1bdceee + ((c & d) | (~c & a)); b = c + ((b << 22) | (b >>> 10));
			a += tmp4 + 0xf57c0faf + ((b & c) | (~b & d)); a = b + ((a <<  7) | (a >>> 25));
			d += tmp5 + 0x4787c62a + ((a & b) | (~a & c)); d = a + ((d << 12) | (d >>> 20));
			c += tmp6 + 0xa8304613 + ((d & a) | (~d & b)); c = d + ((c << 17) | (c >>> 15));
			b += tmp7 + 0xfd469501 + ((c & d) | (~c & a)); b = c + ((b << 22) | (b >>> 10));
			a += tmp8 + 0x698098d8 + ((b & c) | (~b & d)); a = b + ((a <<  7) | (a >>> 25));
			d += tmp9 + 0x8b44f7af + ((a & b) | (~a & c)); d = a + ((d << 12) | (d >>> 20));
			c += tmpa + 0xffff5bb1 + ((d & a) | (~d & b)); c = d + ((c << 17) | (c >>> 15));
			b += tmpb + 0x895cd7be + ((c & d) | (~c & a)); b = c + ((b << 22) | (b >>> 10));
			a += tmpc + 0x6b901122 + ((b & c) | (~b & d)); a = b + ((a <<  7) | (a >>> 25));
			d += tmpd + 0xfd987193 + ((a & b) | (~a & c)); d = a + ((d << 12) | (d >>> 20));
			c += tmpe + 0xa679438e + ((d & a) | (~d & b)); c = d + ((c << 17) | (c >>> 15));
			b += tmpf + 0x49b40821 + ((c & d) | (~c & a)); b = c + ((b << 22) | (b >>> 10));
			a += tmp1 + 0xf61e2562 + ((b & d) | (c & ~d)); a = b + ((a <<  5) | (a >>> 27));
			d += tmp6 + 0xc040b340 + ((a & c) | (b & ~c)); d = a + ((d <<  9) | (d >>> 23));
			c += tmpb + 0x265e5a51 + ((d & b) | (a & ~b)); c = d + ((c << 14) | (c >>> 18));
			b += tmp0 + 0xe9b6c7aa + ((c & a) | (d & ~a)); b = c + ((b << 20) | (b >>> 12));
			a += tmp5 + 0xd62f105d + ((b & d) | (c & ~d)); a = b + ((a <<  5) | (a >>> 27));
			d += tmpa + 0x02441453 + ((a & c) | (b & ~c)); d = a + ((d <<  9) | (d >>> 23));
			c += tmpf + 0xd8a1e681 + ((d & b) | (a & ~b)); c = d + ((c << 14) | (c >>> 18));
			b += tmp4 + 0xe7d3fbc8 + ((c & a) | (d & ~a)); b = c + ((b << 20) | (b >>> 12));
			a += tmp9 + 0x21e1cde6 + ((b & d) | (c & ~d)); a = b + ((a <<  5) | (a >>> 27));
			d += tmpe + 0xc33707d6 + ((a & c) | (b & ~c)); d = a + ((d <<  9) | (d >>> 23));
			c += tmp3 + 0xf4d50d87 + ((d & b) | (a & ~b)); c = d + ((c << 14) | (c >>> 18));
			b += tmp8 + 0x455a14ed + ((c & a) | (d & ~a)); b = c + ((b << 20) | (b >>> 12));
			a += tmpd + 0xa9e3e905 + ((b & d) | (c & ~d)); a = b + ((a <<  5) | (a >>> 27));
			d += tmp2 + 0xfcefa3f8 + ((a & c) | (b & ~c)); d = a + ((d <<  9) | (d >>> 23));
			c += tmp7 + 0x676f02d9 + ((d & b) | (a & ~b)); c = d + ((c << 14) | (c >>> 18));
			b += tmpc + 0x8d2a4c8a + ((c & a) | (d & ~a)); b = c + ((b << 20) | (b >>> 12));
			a += tmp5 + 0xfffa3942 + ((b ^ c) ^ d); a = b + ((a <<  4) | (a >>> 28));
			d += tmp8 + 0x8771f681 + ((a ^ b) ^ c); d = a + ((d << 11) | (d >>> 21));
			c += tmpb + 0x6d9d6122 + ((d ^ a) ^ b); c = d + ((c << 16) | (c >>> 16));
			b += tmpe + 0xfde5380c + ((c ^ d) ^ a); b = c + ((b << 23) | (b >>>  9));
			a += tmp1 + 0xa4beea44 + ((b ^ c) ^ d); a = b + ((a <<  4) | (a >>> 28));
			d += tmp4 + 0x4bdecfa9 + ((a ^ b) ^ c); d = a + ((d << 11) | (d >>> 21));
			c += tmp7 + 0xf6bb4b60 + ((d ^ a) ^ b); c = d + ((c << 16) | (c >>> 16));
			b += tmpa + 0xbebfbc70 + ((c ^ d) ^ a); b = c + ((b << 23) | (b >>>  9));
			a += tmpd + 0x289b7ec6 + ((b ^ c) ^ d); a = b + ((a <<  4) | (a >>> 28));
			d += tmp0 + 0xeaa127fa + ((a ^ b) ^ c); d = a + ((d << 11) | (d >>> 21));
			c += tmp3 + 0xd4ef3085 + ((d ^ a) ^ b); c = d + ((c << 16) | (c >>> 16));
			b += tmp6 + 0x04881d05 + ((c ^ d) ^ a); b = c + ((b << 23) | (b >>>  9));
			a += tmp9 + 0xd9d4d039 + ((b ^ c) ^ d); a = b + ((a <<  4) | (a >>> 28));
			d += tmpc + 0xe6db99e5 + ((a ^ b) ^ c); d = a + ((d << 11) | (d >>> 21));
			c += tmpf + 0x1fa27cf8 + ((d ^ a) ^ b); c = d + ((c << 16) | (c >>> 16));
			b += tmp2 + 0xc4ac5665 + ((c ^ d) ^ a); b = c + ((b << 23) | (b >>>  9));
			a += tmp0 + 0xf4292244 + (c ^ (~d | b)); a = b + ((a <<  6) | (a >>> 26));
			d += tmp7 + 0x432aff97 + (b ^ (~c | a)); d = a + ((d << 10) | (d >>> 22));
			c += tmpe + 0xab9423a7 + (a ^ (~b | d)); c = d + ((c << 15) | (c >>> 17));
			b += tmp5 + 0xfc93a039 + (d ^ (~a | c)); b = c + ((b << 21) | (b >>> 11));
			a += tmpc + 0x655b59c3 + (c ^ (~d | b)); a = b + ((a <<  6) | (a >>> 26));
			d += tmp3 + 0x8f0ccc92 + (b ^ (~c | a)); d = a + ((d << 10) | (d >>> 22));
			c += tmpa + 0xffeff47d + (a ^ (~b | d)); c = d + ((c << 15) | (c >>> 17));
			b += tmp1 + 0x85845dd1 + (d ^ (~a | c)); b = c + ((b << 21) | (b >>> 11));
			a += tmp8 + 0x6fa87e4f + (c ^ (~d | b)); a = b + ((a <<  6) | (a >>> 26));
			d += tmpf + 0xfe2ce6e0 + (b ^ (~c | a)); d = a + ((d << 10) | (d >>> 22));
			c += tmp6 + 0xa3014314 + (a ^ (~b | d)); c = d + ((c << 15) | (c >>> 17));
			b += tmpd + 0x4e0811a1 + (d ^ (~a | c)); b = c + ((b << 21) | (b >>> 11));
			a += tmp4 + 0xf7537e82 + (c ^ (~d | b)); a = b + ((a <<  6) | (a >>> 26));
			d += tmpb + 0xbd3af235 + (b ^ (~c | a)); d = a + ((d << 10) | (d >>> 22));
			c += tmp2 + 0x2ad7d2bb + (a ^ (~b | d)); c = d + ((c << 15) | (c >>> 17));
			b += tmp9 + 0xeb86d391 + (d ^ (~a | c)); b = c + ((b << 21) | (b >>> 11));

			this.a_ = (this.a_ + a) & 0xffffffff;
			this.b_ = (this.b_ + b) & 0xffffffff;
			this.c_ = (this.c_ + c) & 0xffffffff;
			this.d_ = (this.d_ + d) & 0xffffffff;
		},

		fillzero : function(size) {
			var buf = "";
			for (var i = 0; i < size; i++) {
				buf += "\x00";
			}
			return buf;
		},

		main : function(buf, bufSize, update, self, charSize) {
			if (charSize == 1) {
				var totalBitSize = bufSize * 8;
				while (bufSize >= 64) {
					self[update](buf, charSize);
					buf = buf.substr(64);
					bufSize -= 64;
				}
				buf +="\x80";
				if (bufSize >= 56) {
					buf += this.fillzero(63 - bufSize);
					self[update](buf, charSize);
					buf = this.fillzero(56);
				} else {
					buf += this.fillzero(55 - bufSize);
				}
				buf += String.fromCharCode(totalBitSize & 0xff, (totalBitSize >>> 8) & 0xff, (totalBitSize >>> 16) & 0xff, totalBitSize >>> 24);
				buf += "\x00\x00\x00\x00"; // in stead of (totalBitSize) >> 32
				self[update](buf, charSize);
			} else {
				/* charSize == 2 */
				var totalBitSize = bufSize * 16;
				while (bufSize >= 32) {
					self[update](buf, charSize);
					buf = buf.substr(32);
					bufSize -= 32;
				}
				buf +="\x80";
				if (bufSize >= 28) {
					buf += this.fillzero(31 - bufSize);
					self[update](buf, charSize);
					buf = this.fillzero(28);
				} else {
					buf += this.fillzero(27 - bufSize);
				}
				buf += String.fromCharCode(totalBitSize & 0xffff, totalBitSize >>> 16);
				buf += "\x00\x00"; // in stead of (totalBitSize) >> 32
				self[update](buf, charSize);
			}
		},

		VERSION : "1.0",
		BY_ASCII : 0,
		BY_UTF16 : 1,

		calc_Fx : function(msg, mode) {
			var charSize = (arguments.length == 2 && mode == this.BY_UTF16) ? 2 : 1;
			this.a_ = [0x2301, 0x6745];
			this.b_ = [0xab89, 0xefcd];
			this.c_ = [0xdcfe, 0x98ba];
			this.d_ = [0x5476, 0x1032];
			this.main(msg, msg.length, "update_Fx", this, charSize);
			return this.int2hex8_Fx(this.a_) + this.int2hex8_Fx(this.b_) + this.int2hex8_Fx(this.c_) + this.int2hex8_Fx(this.d_);
		},

		calc_std : function(msg, mode) {
			var charSize = (arguments.length == 2 && mode == this.BY_UTF16) ? 2 : 1;
			this.a_ = 0x67452301;
			this.b_ = 0xefcdab89;
			this.c_ = 0x98badcfe;
			this.d_ = 0x10325476;
			this.main(msg, msg.length, "update_std", this, charSize);
			return this.int2hex8(this.a_) + this.int2hex8(this.b_) + this.int2hex8(this.c_) + this.int2hex8(this.d_);
		}
	} // end of MD5
}; // end of CybozuLabs

new function() {
	CybozuLabs.MD5.calc = navigator.userAgent.match(/Firefox/) ? CybozuLabs.MD5.calc_Fx : CybozuLabs.MD5.calc_std;
};
