
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Tập xác định của hàm số y = (2sin x + 1) / (cos x - 1) là:",
    options: [
      "R \\ { k2π, k ∈ Z }",
      "R \\ { π/2 + kπ, k ∈ Z }",
      "R \\ { kπ, k ∈ Z }",
      "R \\ { π + k2π, k ∈ Z }"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "Phương trình sin 2x = √3/2 có nghiệm là:",
    options: [
      "x = ±π/6 + kπ",
      "x = π/6 + kπ và x = π/3 + kπ",
      "x = π/6 + kπ và x = 5π/6 + kπ",
      "x = π/12 + kπ và x = π/3 + kπ"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Cho dãy số (u_n) biết u_n = (2n+1)/(n+2). Số hạng thứ 3 của dãy số là:",
    options: ["7/5", "5/4", "1", "3/2"],
    correctAnswer: 0
  },
  {
    id: 4,
    text: "Cho cấp số cộng (u_n) có u_1 = -2 và công sai d = 3. Giá trị của u_10 là:",
    options: ["28", "25", "31", "-29"],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "Cho cấp số nhân (u_n) có u_1 = 3 và u_2 = -6. Công bội q của cấp số nhân là:",
    options: ["q=2", "q=-2", "q=3", "q=-3"],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "Cho hàm số f(x) = { (-2x² + x + 1)/(x-1) khi x < 1 ; √(3x + 1) khi x ≥ 1 }. Giá trị của lim(x→1⁻) f(x) bằng:",
    options: ["2", "-2", "3", "-3"],
    correctAnswer: 3
  },
  {
    id: 7,
    text: "Giá trị của L = lim (4n² + 3n - 1) / (2n² - n + 5) bằng:",
    options: ["2", "4", "0", "+∞"],
    correctAnswer: 0
  },
  {
    id: 8,
    text: "Tính lim(x→2) (x² - 4) / (x - 2):",
    options: ["0", "2", "4", "+∞"],
    correctAnswer: 2
  },
  {
    id: 9,
    text: "Hàm số nào sau đây liên tục trên toàn bộ tập xác định R?",
    options: ["y = tan x", "y = 1/x", "y = √(x-1)", "y = x³ - 3x + 1"],
    correctAnswer: 3
  },
  {
    id: 10,
    text: "Trong không gian, cho đường thẳng d song song với mặt phẳng (α). Có bao nhiêu điểm chung giữa d và (α)?",
    options: ["0", "1", "2", "Vô số"],
    correctAnswer: 0
  },
  {
    id: 11,
    text: "Cho hình chóp tứ giác S.ABCD có đáy ABCD là hình bình hành. Giao tuyến của hai mặt phẳng (SAB) và (SCD) là:",
    options: [
      "Đường thẳng qua S và song song với AD",
      "Đường thẳng qua S và song song với AB",
      "Đường thẳng SO (O là tâm đáy)",
      "Đường thẳng SI (I là trung điểm CD)"
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    text: "Cho tứ diện ABCD. Gọi G là trọng tâm tam giác BCD. Đường thẳng AG cắt đường thẳng nào sau đây?",
    options: ["BC", "CD", "Trung tuyến DM", "Không cắt đường nào trong (BCD) ngoại trừ G"],
    correctAnswer: 3
  },
  {
    id: 13,
    text: "Mực nước h(t) = 3cos(πt/6 + π/3) + 12. Mực nước thấp nhất của con kênh là bao nhiêu?",
    options: ["12 mét", "15 mét", "9 mét", "6 mét"],
    correctAnswer: 2
  },
  {
    id: 14,
    text: "Đặt cược ván 1: 10 USD. Nếu thua, ván sau gấp đôi. Ông ta thua 7 ván đầu, thắng ván thứ 8. Số tiền lãi là bao nhiêu?",
    options: ["10 USD", "20 USD", "0 USD", "5 USD"],
    correctAnswer: 0
  },
  {
    id: 15,
    text: "Cho hình chóp S.ABCD đáy lớn AB = 2CD. M là trung điểm SA. Gọi I là giao điểm của MC và (SBD). Tỉ số SI/SO là:",
    options: ["1/2", "2/3", "1/3", "3/4"],
    correctAnswer: 1
  }
];
