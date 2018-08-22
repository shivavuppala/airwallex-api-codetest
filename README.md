Starting the Project: Clone the project into required directory

Running the solution: With Docker (Pre requisite: Docker installed on the machine)
cd into the solution root folder
docker build
dockerFilePath (you will get a container id)
docker run containerId

Without Docker (Pre requisite: Node installed on the machine)
cd into the solution root folder
npm install
npm start

Back Ground: This solution is written using Mocha, Docker. Tests were written with the combination of Mocha and Chai

Note: There are few tests which fail as API has few bugs and got to be fixed by Devs. For reference I have added extra logging for those failure test cases with a mention of these will be automatically Pass as the API is fixed. The extra logging can be removed/commented once the fixes are in-place.
