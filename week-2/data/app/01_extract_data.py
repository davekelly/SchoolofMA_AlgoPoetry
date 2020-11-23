import nltk

from nltk import word_tokenize, pos_tag
from nltk.corpus import wordnet

import os
import random
import json

lemmatizer = nltk.WordNetLemmatizer()


INPUT_DATA = ['input/amy-winehouse.txt', 'input/nirvana.txt', 'input/prince.txt']
OUTPUT_DIR = 'output'
OUTPUT_FILE = 'vocab.json'


NOUNS = []
VERBS = []
ADV = []
ADJ = []



def get_word_postag(word):
    if pos_tag([word])[0][1].startswith('J'):
        ADJ.append(word)
        return wordnet.ADJ
    if pos_tag([word])[0][1].startswith('V'):
        VERBS.append(word)
        return wordnet.VERB
    if pos_tag([word])[0][1].startswith('N'):
        NOUNS.append(word)
        return wordnet.NOUN
    if pos_tag([word])[0][1].startswith('R'):
        ADV.append(word)
        return wordnet.ADV
    else:
        return wordnet.NOUN
        # return wordnet.NOUN


def leaves(tree):
    """Finds NP (nounphrase) leaf nodes of a chunk tree."""
    for subtree in tree.subtrees(filter = lambda t: t.label() =='NP'):
        yield subtree.leaves()
        
def normalise(word):
    """Normalises words to lowercase and stems and lemmatizes it."""
    word = word.lower()
    postag = get_word_postag(word)                
    word = lemmatizer.lemmatize(word,postag)
    return word

def get_terms(tree):    
    for leaf in leaves(tree):
        terms = [normalise(w) for w,t in leaf]
        yield terms


def de_duplicate( values ):
    return list(set(values))


def sample( values):
    return random.sample(values, 30)


if __name__ == "__main__":

    for lyrics in INPUT_DATA:
        with open(lyrics) as file:
            document = file.read()            

            tokens = [nltk.word_tokenize(sent) for sent in [document]]
            postag = [nltk.pos_tag(sent) for sent in tokens][0]

            # Rule for NP chunk and VB Chunk
            grammar = r"""
                NBAR:
                    {<NN.*|JJ>*<NN.*>}  # Nouns and Adjectives, terminated with Nouns
                    {<RB.?>*<VB.?>*<JJ>*<VB.?>+<VB>?} # Verbs and Verb Phrases
                    
                NP:
                    {<NBAR>}
                    {<NBAR><IN><NBAR>}  # Above, connected with in/of/etc...
                    
            """
            #Chunking
            cp = nltk.RegexpParser(grammar)

            # the result is a tree
            tree = cp.parse(postag)

            terms = get_terms(tree)
            features = []
            
            for term in terms:

                _term = ''
                for word in term:                    
                    _term += ' ' + word
                features.append(_term.strip())
            
            
    # Actually, just using these...
    NOUNS_DEDUP = list(set(NOUNS))
    VERBS_DEDUP = list(set(VERBS))
    ADV_DEDUP = list(set(ADV))
    ADJ_DEDUP = list(set(ADJ))

    output = {
        'nouns': sample(NOUNS_DEDUP),
        'verbs': sample(VERBS_DEDUP),
        'adverbs': sample(ADV_DEDUP),
        'adjectives': sample(ADJ_DEDUP)
    }

    with open(os.path.join(OUTPUT_DIR, OUTPUT_FILE ), 'w') as outfile:
        json.dump(output, outfile, indent=2)
    