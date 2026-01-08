import React from 'react';
import { Layout } from './components/layout/Layout';
import { TopBar } from './components/ui/TopBar';
import { TextDisplay } from './components/core/TextDisplay';
import { GameModes } from './components/game/GameModes';
import { StatsDisplay } from './components/stats/StatsDisplay';
import { ResultsOverlay } from './components/game/ResultsOverlay';
import { BottomBar } from './components/ui/BottomBar';
import { InputHandler } from './components/core/InputHandler';
import { Confetti } from './components/ui/Confetti';
import { useTypingStore } from './store';

function App() {
  const { showResults, isTyping, gameMode } = useTypingStore();

  return (
    <Layout>
      <InputHandler />
      <Confetti />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-8">
        <TopBar />
        
        <main className="max-w-7xl mx-auto mt-8">
          {!isTyping && !showResults && (
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                TypeQuest 2026
              </h1>
              <p className="text-gray-400 text-center text-lg mb-8">
                Master your typing skills with advanced analytics
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {!showResults ? (
                <>
                  <GameModes />
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <TextDisplay />
                  </div>
                </>
              ) : (
                <ResultsOverlay />
              )}
            </div>

            <div className="space-y-8">
              <StatsDisplay />
            </div>
          </div>
        </main>

        <BottomBar />
      </div>
    </Layout>
  );
}

export default App;