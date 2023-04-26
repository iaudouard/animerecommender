import numpy as np
import warnings
warnings.filterwarnings("error")

class MF():

    def __init__(self, R, K, alpha, beta, iterations):
        """
        Perform matrix factorization to predict empty
        entries in a matrix.

        Arguments
        - R (ndarray)   : user-item rating matrix
        - K (int)       : number of latent dimensions
        - alpha (float) : learning rate
        - beta (float)  : regularization parameter
        """

        self.R = R
        self.num_users, self.num_items = R.shape
        self.K = K
        self.alpha = alpha
        self.beta = beta
        self.iterations = iterations

    def train(self):
        # Initialize user and item latent feature matrice with random numbers
        self.P = np.random.normal(scale=1./self.K, size=(self.num_users, self.K))
        self.Q = np.random.normal(scale=1./self.K, size=(self.num_items, self.K))

        # Initialize the biases
        self.b_u = np.zeros(self.num_users)  #bias for anime
        self.b_i = np.zeros(self.num_items) #bias for user
        self.b = np.mean(self.R[np.where(self.R != 0)]) #global bias

        # Create a list of training samples
        self.samples = [
            (i, j, self.R[i, j])
            for i in range(self.num_users)
            for j in range(self.num_items)
            if self.R[i, j] > 0
        ]

        # Perform stochastic gradient descent for number of iterations
        training_process = []
        for i in range(self.iterations):
            np.random.shuffle(self.samples)
            self.sgd()
            mse = self.mse()
            training_process.append((i, mse))
            if (i+1) % 1 == 0:
                print("Iteration: %d ; error = %.4f" % (i+1, mse))

        return training_process

    def mse(self):
        """
        A function to compute the total mean square error
        """
        xs, ys = self.R.nonzero()
        predicted = self.full_matrix()
        error = 0
        for x, y in zip(xs, ys):
            error += pow(self.R[x, y] - predicted[x, y], 2)
        return np.sqrt(error)
    
    def trunc(self, values, decs=0):
        return np.trunc(values*10**decs)/(10**decs)
    
    def sgd(self):
        """
        Perform stochastic graident descent
        """
        for i, j, r in self.samples:
            # Computer prediction and error
            prediction = self.get_rating(i, j)
            e = (r - prediction)

            # Update biases
            self.b_u[i] += self.alpha * (e - self.beta * self.b_u[i])
            self.b_i[j] += self.alpha * (e - self.beta * self.b_i[j])
            
            # Update user and item latent feature matrices

            self.P[i, :] += self.alpha * (e * self.Q[j, :] - self.beta * self.P[i,:])
            self.Q[j, :] += self.alpha * (e * self.P[i, :] - self.beta * self.Q[j,:])
            

            
            
            

    def get_rating(self, i, j):
        """
        Get the predicted rating of user i and item j
        """
        prediction = self.b + self.b_u[i] + self.b_i[j] + self.P[i, :].dot(self.Q[j, :].T)
        return prediction

    def full_matrix(self):
        """
        Computer the full matrix using the resultant biases, P and Q
        """
        return self.b + self.b_u[:,np.newaxis] + self.b_i[np.newaxis:,] + self.P.dot(self.Q.T)

import pandas as pd

users = pd.read_csv("../../data/csv/reviews/users.csv");
animes = pd.read_csv("../../data/csv/reviews/animes.csv");
ratings = pd.read_csv("../../data/csv/reviews/parsed_reviews.csv");

users.dtype = "float32"
animes.dtype = "float32"
ratings.dtype = "float32"

user_amount = users.size
anime_amount = animes.size
matrix = np.zeros((1000, 500))
matrix.dtype = "float64"
#make mapping array
mapping_uid = {users["uid"][x] : x for x in range(user_amount)}
mapping_anime_uid = {animes["anime_uid"][x] : x for x in range(anime_amount)}

# samples = []
# for index, x in ratings.iterrows():
#     samples.append((mapping_uid[x["uid"]], mapping_anime_uid[x["anime_uid"]], x["score"]))


for index, x in ratings.iterrows():
    if(mapping_uid[x["uid"]] < 1000 and mapping_anime_uid[x["anime_uid"]] < 500):
        matrix[mapping_uid[x["uid"]], mapping_anime_uid[x["anime_uid"]]] = x["score"]

np.nan_to_num(matrix)

#matrix = np.array([[1, 2, 3, 4],[0, 2, 3, 4],[5, 4, 2, 1],[0, 4, 0, 1],[4, 3, 1, 4]])

mf = MF(matrix, K = 2, alpha = 0.1, beta = 0.01, iterations = 200)
mf.train()
print(mf.full_matrix())

