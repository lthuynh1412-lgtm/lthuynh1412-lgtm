
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { GameState, RewardType, UserInfo } from './types';
import { Trophy, Compass, Heart, RotateCcw, PartyPopper, Gift, User, BookOpen, AlertCircle } from 'lucide-react';

const REWARDS: RewardType[] = ['1+', '2+', 'ALMOST', 'LUCK'];
const MAX_ATTEMPTS = 3;
const STORAGE_KEY = 'math_maze_scores_2026';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ fullName: '', className: '' });
  const [gameState, setGameState] = useState<GameState>({
    user: null,
    currentStep: 0,
    score: 0,
    lives: 3,
    isGameOver: false,
    isGameWon: false,
    selectedReward: null,
    attemptsUsed: 0,
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const getAttemptsForUser = (fullName: string, className: string) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return 0;
    const scores = JSON.parse(data);
    const key = `${fullName.trim().toLowerCase()}-${className.trim().toLowerCase()}`;
    return scores[key] || 0;
  };

  const incrementAttemptsForUser = (fullName: string, className: string) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const scores = data ? JSON.parse(data) : {};
    const key = `${fullName.trim().toLowerCase()}-${className.trim().toLowerCase()}`;
    const newCount = (scores[key] || 0) + 1;
    scores[key] = newCount;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return newCount;
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.fullName.trim() || !userInfo.className.trim()) {
      setAuthError('Vui lòng nhập đầy đủ họ tên và lớp!');
      return;
    }

    const used = getAttemptsForUser(userInfo.fullName, userInfo.className);
    if (used >= MAX_ATTEMPTS) {
      setAuthError(`Bạn đã hết lượt chơi! (Tối đa ${MAX_ATTEMPTS} lần).`);
      return;
    }

    const newAttemptCount = incrementAttemptsForUser(userInfo.fullName, userInfo.className);
    
    setGameState({
      user: { ...userInfo },
      currentStep: 0,
      score: 0,
      lives: 3,
      isGameOver: false,
      isGameWon: false,
      selectedReward: null,
      attemptsUsed: newAttemptCount,
    });
    setAuthError(null);
  };

  const handleAnswer = (optionIndex: number) => {
    const currentQuestion = QUESTIONS[gameState.currentStep];
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setFeedback({ type: 'success', message: 'Chính xác! Bạn đang tiến gần hơn tới kho báu.' });
      
      setTimeout(() => {
        setFeedback(null);
        if (gameState.currentStep === QUESTIONS.length - 1) {
          const finalReward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
          setGameState(prev => ({
            ...prev,
            isGameWon: true,
            selectedReward: finalReward,
            score: prev.score + 1
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1,
            score: prev.score + 1
          }));
        }
      }, 1000);
    } else {
      setFeedback({ type: 'error', message: 'Rất tiếc! Câu trả lời chưa đúng.' });
      
      setTimeout(() => {
        setFeedback(null);
        if (gameState.lives <= 1) {
          setGameState(prev => ({ ...prev, lives: 0, isGameOver: true }));
        } else {
          setGameState(prev => ({ ...prev, lives: prev.lives - 1 }));
        }
      }, 1000);
    }
  };

  const logout = () => {
    setGameState(prev => ({ ...prev, user: null }));
    setUserInfo({ fullName: '', className: '' });
  };

  const restartGameFlow = () => {
    // Check attempts again if they want to play again
    const used = getAttemptsForUser(gameState.user!.fullName, gameState.user!.className);
    if (used >= MAX_ATTEMPTS) {
      alert(`Bạn đã hết lượt chơi cho tài khoản này! (Tối đa ${MAX_ATTEMPTS} lần).`);
      logout();
      return;
    }

    const newAttemptCount = incrementAttemptsForUser(gameState.user!.fullName, gameState.user!.className);
    setGameState(prev => ({
      ...prev,
      currentStep: 0,
      score: 0,
      lives: 3,
      isGameOver: false,
      isGameWon: false,
      selectedReward: null,
      attemptsUsed: newAttemptCount,
    }));
    setFeedback(null);
  };

  // 1. Login Screen
  if (!gameState.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-700 max-w-lg w-full z-10 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-lg shadow-indigo-500/20">
              <Compass size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-heading mb-2 text-white uppercase tracking-tight">Mê Cung Toán Học</h1>
            <p className="text-slate-400">Chào mừng bạn đến với thử thách New Year 2026</p>
          </div>

          <form onSubmit={handleStartGame} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text"
                  placeholder="Nhập họ và tên học sinh"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">Lớp</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text"
                  placeholder="Ví dụ: 11A1"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  value={userInfo.className}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, className: e.target.value }))}
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-sm animate-in shake duration-300">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-900/40 active:scale-[0.98]"
            >
              BẮT ĐẦU KHÁM PHÁ
            </button>

            <p className="text-center text-xs text-slate-500 italic mt-4">
              Lưu ý: Mỗi học sinh chỉ được tham gia tối đa 3 lần.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // 2. Game Over Screen
  if (gameState.isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-900">
        <div className="bg-slate-800 p-10 rounded-[3rem] shadow-2xl border border-red-500/30 max-w-md w-full animate-in fade-in zoom-in duration-300">
          <RotateCcw size={64} className="mx-auto mb-6 text-red-500" />
          <h1 className="text-4xl font-heading mb-4 text-red-400 uppercase">Thất Bại!</h1>
          <p className="text-slate-300 mb-2">Bạn đã hết mạng để vượt qua mê cung.</p>
          <p className="text-slate-400 text-sm mb-8">Lượt chơi hiện tại: {gameState.attemptsUsed}/{MAX_ATTEMPTS}</p>
          
          <div className="space-y-3">
            <button 
              onClick={restartGameFlow}
              disabled={gameState.attemptsUsed >= MAX_ATTEMPTS}
              className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                gameState.attemptsUsed >= MAX_ATTEMPTS 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40'
              }`}
            >
              <RotateCcw size={20} /> {gameState.attemptsUsed >= MAX_ATTEMPTS ? 'HẾT LƯỢT CHƠI' : 'THỬ LẠI LẦN NỮA'}
            </button>
            <button 
              onClick={logout}
              className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 py-3 rounded-xl transition-all text-sm"
            >
              Thoát và đổi tài khoản
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Victory Screen
  if (gameState.isGameWon) {
    const getRewardContent = () => {
      switch (gameState.selectedReward) {
        case '1+': return { text: 'Điểm cộng 1+', color: 'text-green-400' };
        case '2+': return { text: 'Điểm cộng 2+', color: 'text-yellow-400' };
        case 'ALMOST': return { text: 'Bạn gần được điểm cộng rồi!', color: 'text-blue-400' };
        case 'LUCK': return { text: 'Chúc bạn may mắn lần sau!', color: 'text-purple-400' };
        default: return { text: 'Happy New Year 2026!', color: 'text-white' };
      }
    };

    const reward = getRewardContent();

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-b from-slate-900 to-indigo-900">
        <div className="bg-slate-800/80 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border border-yellow-500/50 max-w-xl w-full animate-in slide-in-from-bottom duration-700">
          <PartyPopper size={80} className="mx-auto mb-6 text-yellow-400 sparkle-icon" />
          <h1 className="text-4xl font-heading mb-2 text-yellow-400 uppercase tracking-widest">KHO BÁU ĐÃ MỞ!</h1>
          <p className="text-indigo-200 mb-6 font-semibold">{gameState.user.fullName} - {gameState.user.className}</p>
          
          <div className="my-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
            <Gift className="mx-auto mb-4 text-pink-500" size={48} />
            <h2 className={`text-3xl font-bold ${reward.color} mb-2`}>{reward.text}</h2>
            <p className="text-slate-400 text-sm">Phần thưởng dành cho nhà thông thái</p>
          </div>
          
          <h3 className="text-2xl font-heading mb-8 text-indigo-300">Happy New Year 2026!</h3>
          
          <div className="space-y-4">
            <button 
              onClick={restartGameFlow}
              disabled={gameState.attemptsUsed >= MAX_ATTEMPTS}
              className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg ${
                gameState.attemptsUsed >= MAX_ATTEMPTS 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-yellow-900/40'
              }`}
            >
              {gameState.attemptsUsed >= MAX_ATTEMPTS ? 'ĐÃ SỬ DỤNG HẾT 3 LƯỢT' : 'CHƠI LẠI (TỐI ĐA 3 LẦN)'}
            </button>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Đổi tài khoản khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Main Gameplay
  const currentQuestion = QUESTIONS[gameState.currentStep];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Header Info */}
      <header className="flex flex-wrap justify-between items-center mb-8 bg-slate-800/50 p-4 md:px-6 md:py-4 rounded-[2rem] border border-slate-700 sticky top-4 z-10 backdrop-blur-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
            <User className="text-indigo-400" size={20} />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-sm truncate max-w-[150px]">{gameState.user.fullName}</p>
            <p className="text-xs text-indigo-300 font-semibold">{gameState.user.className} • Lượt {gameState.attemptsUsed}/3</p>
          </div>
        </div>
        
        <div className="flex-1 mx-4 hidden lg:block">
           <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${((gameState.currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
           </div>
           <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1 text-center">Tiến trình mê cung: {gameState.currentStep + 1}/{QUESTIONS.length}</p>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700">
            <Heart className={`${gameState.lives <= 1 ? 'text-red-500 animate-pulse' : 'text-red-400'}`} fill="currentColor" size={16} />
            <span className="font-bold text-lg">{gameState.lives}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700">
            <Trophy className="text-yellow-500" fill="currentColor" size={16} />
            <span className="font-bold text-lg">{gameState.score}</span>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col justify-center">
        <div className="bg-slate-800 p-6 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-700/50 mb-8 min-h-[450px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50"></div>
          
          <div className="mb-10 flex-1">
            <span className="inline-block px-4 py-1.5 bg-indigo-900/50 text-indigo-300 rounded-full text-xs font-bold mb-6 uppercase tracking-widest border border-indigo-500/20">Câu hỏi {gameState.currentStep + 1}</span>
            <h2 className="text-xl md:text-3xl font-semibold leading-snug text-slate-100">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                disabled={feedback !== null}
                onClick={() => handleAnswer(idx)}
                className={`
                  group relative p-5 rounded-2xl text-left transition-all duration-200
                  ${feedback ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
                  bg-slate-700/30 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-700/60
                `}
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-slate-200 pt-1 text-lg leading-tight">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback Overlay */}
          {feedback && (
            <div className={`
              absolute inset-0 flex items-center justify-center backdrop-blur-[2px] z-20
              ${feedback.type === 'success' ? 'bg-green-500/5' : 'bg-red-500/5'}
              animate-in fade-in duration-300
            `}>
              <div className={`
                px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl flex items-center gap-4
                ${feedback.type === 'success' ? 'bg-green-600 text-white shadow-green-900/40' : 'bg-red-600 text-white shadow-red-900/40'}
                animate-in zoom-in slide-in-from-top-8 duration-300
              `}>
                {feedback.type === 'success' ? <PartyPopper size={28} /> : <AlertCircle size={28} />}
                {feedback.message}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Instructions */}
      <footer className="mt-auto text-center py-6">
        <div className="inline-flex items-center gap-2 text-slate-500 text-sm mb-2">
           <Compass size={14} />
           <span>Vượt qua 15 thử thách toán học để tìm thấy kho báu</span>
        </div>
        <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">Mỗi lần sai mất 1 trái tim • Tối đa 3 lần chơi/học sinh</p>
      </footer>
    </div>
  );
};

export default App;
