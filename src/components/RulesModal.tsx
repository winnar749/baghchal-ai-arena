
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const RulesModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Game Rules</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Baghchal: Game Rules</DialogTitle>
          <DialogDescription>
            The traditional Nepali board game of tigers and goats
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] p-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-2">Game Overview</h3>
              <p>Baghchal (बाघचाल) is a traditional board game from Nepal that pits 4 tigers against 20 goats on a 5×5 grid board.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Game Components</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Board:</strong> 5×5 grid with lines connecting the intersections</li>
                <li><strong>Pieces:</strong> 4 tigers and 20 goats</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Game Objective</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Tigers:</strong> Capture 5 goats</li>
                <li><strong>Goats:</strong> Block all tiger moves</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Setup</h3>
              <p>Tigers are placed on the four corners of the board. Goats begin off the board.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Gameplay</h3>
              <p>The game has two phases:</p>
              <ol className="list-decimal ml-6 space-y-3 mt-3">
                <li>
                  <strong>Goat Placement Phase:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    <li>Goats and tigers alternate turns</li>
                    <li>On a goat's turn, one goat is placed on any empty intersection</li>
                    <li>Tigers can move and capture from the beginning</li>
                    <li>This phase ends when all 20 goats are placed</li>
                  </ul>
                </li>
                <li>
                  <strong>Moving Phase:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    <li>All pieces move one space along the lines to adjacent empty intersections</li>
                    <li>Tigers can capture goats by jumping over them (similar to checkers)</li>
                    <li>Tigers can only capture by jumping over a goat to an empty spot directly behind it</li>
                    <li>Goats cannot capture tigers</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Winning Conditions</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Tigers win:</strong> If they capture 5 goats</li>
                <li><strong>Goats win:</strong> If they block all tiger moves</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">Reinforcement Learning in Baghchal</h3>
              <p>This implementation includes a simple AI that makes random moves. In the future, we plan to enhance it with reinforcement learning algorithms that will:</p>
              <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Learn optimal strategies through self-play</li>
                <li>Develop different playing styles for both tigers and goats</li>
                <li>Visualize the AI's decision-making process</li>
                <li>Allow different difficulty levels</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RulesModal;
